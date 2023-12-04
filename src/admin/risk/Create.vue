<template>
  <ion-content :scroll-events="true">
    <v-form class="panel risk" action="/admin/obresec/api/risk" @resize="tabviewResize"
      :header="(o.id ? $t('Edit') : $t('Create')) + ' ' + $t('Risk')">
      <div class="v-toolbar" style="padding: 5px">
        <v-button :value="$t('Save')" icon="fa-save" @click.prevent="save" />
        <v-button :value="$t('New')" icon="fa-file" @click.prevent="create" />
      </div>
      <div style="flex:1;display: flex;">
        <v-tabview style="flex:1;width: calc(100% - 320px);height: 100% !important;display: flex;flex-direction: column;"
          @resize="tabviewResize">
          <div :tab="$t('GeographicLocation')" class="v-form" >
            <div class="col-2" style="margin: 0px 5px;display: flex;">
              <div style="flex:1;margin-right: 2px;">
                <label>{{ $t('Province') }}:</label>
                <v-select v-model="o.ext.province" name="province" required="true"
                  @input="$refs.districtSelect.load({ provinceId: parseInt(o.ext.province) }); $refs.layerControl.setScope(o.ext.province);">
                  <option value="">{{ $t('SelectOneMessage') }}</option>
                  <v-options url="/admin/directory/api/province/0/0?regionId=2" value-field="code" display-field="name" />
                </v-select>
              </div>
              <div style="flex:1;margin-left: 2px;">
                <label>{{ $t('District') }}:</label>
                <v-select v-bind:disabled="!o.ext.province" v-bind:autoload="false" name="district" ref="districtSelect"
                  v-model="o.districtId" required="true" class="v-district"
                  @input="$refs.layerControl.setScope(o.districtId)">
                  <option value="">{{ $t('SelectOneMessage') }}</option>
                  <v-options url="/admin/directory/api/district/0/0" value-field="code" display-field="name" />
                </v-select>
              </div>
            </div>
            <div style="flex:1;margin-top: 10px;border-top: 1px solid #ccc9c9;">
              <v-map ref="map" @build="mapBuild" style="width: 100%;height: 100%;" @translateend="translateend">
                <v-layer-control ref="layerControl" @scope="layerControlScope" />
                <v-map-control @click="addMarker" style="top: 80px;left: .5em;" icon="fa-map-marker" />
                <v-map-control @click="$refs.layerControl.setScope(0)" style="bottom: 8px;left: 0.5em;"
                  class="ic-42 ancash" v-bind:icon="pathIcon + '#icon-ancash'" />
              </v-map>
              <!--div v-if="0 > o.lat">{{ o.lat }}, {{ o.lon }}</div>
            <template v-if="o.userId">
              <label>#{'Registrado Por'}:</label>
              <a class="people" href="/admin/directorio/#{o.userId}" data-people="#{o.userId}" target="_blank">
                {{ o.ext.user.name }}
              </a>
            </template-->
            </div>
          </div>
          <div :tab="$t('History')" style="display: none;">

          </div>
        </v-tabview>
        <div class="v-form _" style="overflow-y: auto;display: inline-block;width: 300px;padding-left: 10px;">
          <label>{{ $t('Type') }}:</label>
          <v-select v-model="o.type">
            <option value="">{{ $t('SelectOneMessage') }}</option>
            <v-options url="/admin/obresec/api/risk-type/0/0" display-field="name" />
          </v-select>
          <label>{{ $t('Address') }}:</label>
          <v-textarea maxlength="250" v-model="o.address" />
          <label>{{ $t('From') }}:</label>
          <v-calendar required="true" v-model="o.fechaIni" />
          <label>{{ $t('To') }}:</label>
          <v-calendar v-model="o.fechaFin" />

          <label>{{ $t('Description') }}:</label>
          <v-textarea maxlength="250" v-model="o.description" />
          <label>{{ $t('Observation') }}:</label>
          <v-textarea maxlength="250" v-model="o.observation" />
        </div>
      </div>
    </v-form>
  </ion-content>
</template>
<script>
import { IonContent } from "@ionic/vue";
import { Geolocation } from "@capacitor/geolocation";
//import M from "minimatch";

var { _, axios } = window;
export default _.ui({
  components: { IonContent },
  props: ["id"],
  data() {

    return {
      c: 0, co: null, pathIcon: '/cdn/symbol-defs.svg',
      o: {
        id: null, description: null,
        ext: { province: null },
        districtId: null
      }
    };
  },
  mounted() {
    var me = this;
    me.$on('sync', me.app.onSyncPoll);
    me.changeRoute();
  },
  methods: {
    create() {
      var me = this, o = { description: null, observation: null, address: null, victimAge: null, criminalAge: null, ext: { province: null } };
      o.districtId = me.o.districtId;
      o.ext.province = me.o.ext.province;
      me.o = o;
      this.$refs.map.collection.clear();
    },
    mapBuild() {
      var o = this.o;
      if (0 > o.lon) {
        this.$refs.map.addFeature({
          lon: o.lon,
          lat: o.lat
        }, {});
      }
    },
    translateend(o) {
      this.o.lat = o.lat;
      this.o.lon = o.lon;
    },
    tabviewResize(e) {
      alert(6);
      this.$refs.map.$el.style.height =
        (e.height - e.$target.$el.children[1].children[0].offsetHeight - 5) + 'px';
      var event = new Event("parentResize", { bubbles: false });
      event.height = (this.$refs.map.$el.offsetHeight - 25);
      this.$refs.map.$el.dispatchEvent(event);
    },
    async changeRoute() {
      var me = this, id = me.id;
      if (id < 0 || id > 0 && !me.app.connected) {
        me.getStoredList("poll").then((poll) => {
          poll.forEach((e) => {
            if (e.tmpId == Math.abs(me.id) || e.id == id) {
              me.o = e;
              me.trayLocation = e.lat && e.lon;
            }
          });
        });
      } else if (me.id) {
        axios
          .get('/api/obresec/risk/' + id, { params: { poll: me.app.poll } })
          .then((r) => {
            var o = r.data;
            me.o = o;
            me.c++;
            me.$refs.layerControl.unmove = true;
            console.log('se detubo el desplazamiento para que se pudiera poner de centro la coordenada->' + o.lon + ',' + o.lat);
          });
      } else {
        try {
          var s = JSON.parse(localStorage.getItem("setting")),
            o = me.o;
          o.region = s.region.id;
          o.provincia = s.province.code;
          o.distrito = s.district.code;
          o.centro_poblado = s.town.id;
        } catch (e) {
          console.error(e);
        }
      }
      me.removeStored("people");
    },
    layerControlScope(v) {
      //esto se ejecutara despues de cargar 
      //se debe permitir el movimiento despues que ya se centro en donde esta el marcador
      let me = this, o = me.o;
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
    addMarker() {
      var m = this.$refs.map;
      if (!m.collection.getLength()) {
        m.addFeature(null, { zoom: 17 });
      } else
        m.map.getView().animate({
          center: m.collection.item(0).getGeometry().getCoordinates(),
          zoom: 17,
          duration: 500
        });
    },
    changeTown(v) {
      var me = this;
      if (v) {
        me.getStoredList('sample').then((towns) => {
          towns.forEach((town) => {
            if (v == town.code) {
              if (!me.o.urb_rur)
                me.o.urb_rur = town.tipo;
            }
          })
        })
      }
    },
    async printCurrentPosition() {
      this.trayLocation = 1;
      const coordinates = await Geolocation.getCurrentPosition();
      //Debe ponerse una vntana de permiso
      var c = coordinates.coords;
      this.o.lat = c.latitude;
      this.o.lon = c.longitude;
    },
    close(o) {
      var me = this;
      if (o.data.id) me.o.id = o.data.id;
      if (o.data.tmpId) me.o.tmpId = o.data.tmpId;
      me.$router.replace("/admin/poll/" + me.o.id);
    },
  },
});
</script>
<style scoped>
/deep/ .risk>.v-dialog-content>form {
  display: flex;
  flex-direction: column;
}

</style>