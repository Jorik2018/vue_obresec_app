<template>
  <ion-content :scroll-events="true">
    <v-form class="panel" action="/admin/obresec/api/crime"
      :header="(o.id ? $t('Edit') : $t('Create')) + ' ' + $t('Crime')">
      <div class="v-toolbar" style="padding: 5px;background-color: lightgray;">
        <v-button :value="$t('Save')" icon="fa-save" @click.prevent="save" />
        <v-button :value="$t('New')" icon="fa-file" @click.prevent="create" />
      </div>
      <div style="flex:1;display: flex;">
        <v-fieldset legend="Ubicación Geográfica" class="v-form" style="flex:1;margin: 10px 0px 10px 10px;width: calc(100% - 350px);
                    display: flex;
                    flex-direction: column;">
          <div class="col-2" style="display: flex;">
            <div ref="controls" style="flex:1;margin-right: 2px;">
              <label>{{ $t('Province') }}:</label>
              <v-select v-model="o.ext.province" name="province" required="true"
                @input="changeProvince({ provinceId: parseInt(o.ext.province) })">
                <option value="">{{ $t('SelectOneMessage') }}</option>
                <v-options url="/admin/directory/api/province/0/0?regionId=2" value-field="code" display-field="name" />
              </v-select>
            </div>
            <div style="flex:1;margin-left: 2px;">
              <label>{{ $t('District') }}:</label>
              <v-select ref="district" :disabled="!o.ext.province" :autoload="false" v-model="o.districtId" required="true"
                class="v-district">
                <option value="">{{ $t('SelectOneMessage') }}</option>
                <v-options url="/admin/directory/api/district/0/0" value-field="code" display-field="name" />
              </v-select>
            </div>
          </div>
          <v-map ref="map" @build="mapBuild" style="flex:1;margin-top: 10px;height:300px" @translateend="translateend">
            <v-layer-control ref="layerControl" @scope="layerControlScope" />
            <v-map-control @click="addMarker" style="top: 80px;left: .5em;" icon="fa-map-marker" />
            <v-map-control @click="$refs.layerControl.setScope(0)" style="bottom: 8px;left: 0.5em;" class="ic-42 ancash"
              :icon="'ancash'" />
          </v-map>
          <div style="position: absolute;
    bottom: 28px;
    left: 74px;" v-if="0 > o.lat">{{ o.lat }}, {{ o.lon }}</div>
        </v-fieldset>
        <div class="v-form _" ref="form" style="overflow-y: auto;
              padding: 10px;
              width: 300px;">
          <label>{{ $t('Date') }}:</label>
          <v-calendar required="true" v-model="o.fecha" />
          <label>{{ $t('Description') }}:</label>
          <v-textarea maxlength="250" v-model="o.description" />
          <label>{{ $t('Address') }}:</label>
          <v-textarea maxlength="250" v-model="o.address" />
          <v-fieldset legend="Clasificaci&oacute;n" class="v-form">
            <label>{{ $t('Category') }}:</label>
            <v-select v-model="o.ext.category" required="true"
              @input="$refs.typeCategory.load({ category: o.ext.category })">
              <option value="">{{ $t('SelectOneMessage') }}</option>
              <v-options url="/admin/obresec/api/crime-category/0/0" value-field="id" display-field="name" />
            </v-select>
            <label>{{ $t('Type') }}:</label>
            <v-select ref="typeCategory" :autoload="false" required="true" :disabled="!o.ext.category"
              v-model="o.crimeTypeId">
              <option value="">{{ $t('SelectOneMessage') }}</option>
              <v-options url="/admin/obresec/api/crime-type/0/0" value-field="id" display-field="name" />
            </v-select>
          </v-fieldset>
          <v-fieldset legend="Victima" closable="true">
            <label>{{ $t('Sex') }}:</label>
            <v-radio-group v-model="o.victimSex">
              <v-radio value="M" label="Masculino" />
              <v-radio value="F" label="Femenino" />
            </v-radio-group>
            <label>{{ $t('Age') }}:</label>
            <v-number v-model="o.victimAge" min="0" max="120" />
            <label>{{ $t('Nationality') }}:</label>
            <v-autocomplete queryEvent="enter" placeholder="Ingrese mas de 2 letras y presione ENTER" minQueryLength="3"
              emptyMessage="Buscar por nombre (2 caracteres min.)" size="60" v-model="o.ext.victimCountry"
              src="/admin/directory/api/country">
              <template v-slot:label="{ selected }" v-if="o.ext.victimCountry">{{ selected.name }}</template>
              <template v-slot="{ row }">
                {{ row.name }}
              </template>
            </v-autocomplete>
          </v-fieldset>
          <v-fieldset legend="Agraviante" closable="true">
            <label>{{ $t('Sex') }}:</label>
            <v-radio-group v-model="o.criminalSex">
              <v-radio value="M" label="Masculino" />
              <v-radio value="F" label="Femenino" />
            </v-radio-group>
            <label>{{ $t('Age') }}:</label>
            <v-number v-model="o.criminalAge" min="0" max="120" />
            <label>{{ $t('Nationality') }}:</label>
            <v-autocomplete queryEvent="enter" placeholder="Ingrese mas de 2 letras y presione ENTER" minQueryLength="3"
              emptyMessage="Buscar por nombre (2 caracteres min.)" size="60" v-model="o.ext.criminalCountry"
              src="/admin/directory/api/country">
              <template v-slot:label="{ selected }" v-if="o.ext.criminalCountry">{{ selected.name }}</template>
              <template v-slot="{ row }">
                {{ row.name }}
              </template>
            </v-autocomplete>
          </v-fieldset>
          <label>Observación:</label>
          <v-textarea maxlength="250" v-model="o.observation" />
        </div>
      </div>
    </v-form>
  </ion-content>
</template>
<script>
var { _, axios } = window;
export default _.ui({
  props: ['id'],
  data() {
    return {
      c: 0, co: null, pathIcon: '/cdn/symbol-defs.svg',
      o: {
        id: null, description: null, victimAge: null, criminalAge: null,
        ext: { province: null },
        districtId: null
      }
    };
  },
  updated2() {
    var me = this, v = me.o.districtId ? me.o.districtId : me.o.ext.province;
    //console.log('updated '+(me.o.districtId ? me.o.districtId : me.o.ext.province));
    //console.log(v);
    me.$refs.layerControl.setScope(v ? v : null);
  },
  mounted() {
    this.changeRoute();
  },
  //--mounted:function(){this.pathIcon=require('@/ancash.svg');},
  methods: {
    changeRoute() {
      var me = this, id = me.id;
      if (id)
        axios.get('/api/obresec/crime/' + id).then((r) => {
          var o = r.data || {};
          me.o = o;
          me.$refs.layerControl.unmove = true;
        });
      else {
        var s = localStorage.getItem('crime.scope');
        if (s)
          me.layerControlScope(s);
      }
    },
    changeProvince(o) {
      var me = this;
      if (me.o.districtId &&
        !me.o.districtId.toString().startsWith(_.pad(o.provinceId, 4))
      ) {
        me.o.districtId = null;
      }
      me.$refs.district.load(o);
    },
    create() {
      var me = this, o = { description: null, victimAge: null, criminalAge: null, ext: { province: null } };
      o.districtId = me.o.districtId;
      o.ext.province = me.o.ext.province;
      me.o = o;
      me.$refs.map.collection.clear();
      me.open("/admin/obresec/crime/create");
    },
    layerControlScope(v) {
      //esto se ejecutara despues de cargar 
      //se debe permitir el movimiento despues que ya se centro en donde esta el marcador
      var me = this, o = me.o;
      v = parseInt(v.feature ? v.feature.getId() : v)
      //console.log('layerControlScope='+v);
      if (v > 9999) {
        me.o.ext.province = Math.trunc(v / 100);
        me.o.districtId = v;
        if (me.$refs.layerControl.unmove && 0 > o.lon) {
          console.log('mapBuild >  addMarker ' + o.lon + ',' + o.lat);
          me.$refs.map.addFeature(o);
          me.addMarker();
        }
        me.$refs.layerControl.unmove = 0;
        console.log('sse vuelve a permitir el movimiento');

      } else if (v > 99) {
        me.o.ext.province = v;
      }

    },
    process(o) {
      o.districtId = _.pad(o.districtId, 6);
      o.victimCountry = o.ext.victimCountry ? o.ext.victimCountry.id : o.victimCountry;
      o.criminalCountry = o.ext.criminalCountry ? o.ext.criminalCountry.id : o.criminalCountry;
      return o;
    },
    mapBuild() {
      var me = this, o = me.o;
      if (0 > o.lon) {
        console.log('mapBuild >  addMarker ' + o.lon + ',' + o.lat);
        me.$refs.map.addFeature(o);
        me.addMarker();
      }
    },
    translateend(e) {
      var o = this.o;
      o.lat = e.lat;
      o.lon = e.lon;
    },
    addMarker() {
      var m = this.$refs.map;
      console.log(m);
      if (m.collection) {
        if (!m.collection.getLength()) {
          m.addFeature(null);
        } else {
          m.map.getView().animate({
            center: m.collection.item(0).getGeometry().getCoordinates(),
            zoom: 17,
            duration: 1000
          });
        }
      }
    },
    close2(r) {
      this.o.id = r.data;
    }
  }
});
</script>
<style scoped>
/deep/ .v-dialog-content>form {
  display: flex;
  flex-direction: column;
}
/deep/ .v-dialog-content>form > div{
  padding: 0px !important; 
}
</style>