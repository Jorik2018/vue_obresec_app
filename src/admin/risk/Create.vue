<template>
  <ion-content :scroll-events="true">
    <v-form
      style="padding: 10px"
      class="v-form"
      :class="
        o.id < 0 || (o.tmpId && !o.synchronized)
          ? 'yellow'
          : o.tmpId
          ? 'green'
          : ''
      "
      store="poll"
      action="/api/poll/main"
    >
      <span class="v-button-top-float" v-on:click="save"
        ><i class="fa fa-save"></i
      ></span>
      <h2
        style="
          margin-right: 50px;
          padding-left: 34px;
          margin-bottom: 20px;
          position: relative;
          font-size: 24px;
          background-color: transparent;
        "
      >
        CUESTIONARIO SOBRE CONDICIONES DE VIDA 2022
      </h2>
      <div v-if="o.id" :class="o.id < 0 ? 'yellow' : ''">ID={{ o.id }}</div>
      <v-fieldset
        legend="SECCIÓN DE IDENTIFICACIÓN MUESTRAL Y GEOGRÁFICA DE LOS ENCUESTADOS"
      >
        <label>Departamento:</label>
        <v-select
          v-model="o.region"
          @input="$refs.province.load({ code: pad(o.region, 2) })"
        >
          <option value="">Seleccionar Opci&oacute;n</option>
          <v-options store="region" value-field="id" display-field="name" />
        </v-select>
        <label>Provincia:</label>
        <v-select
          v-model="o.provincia"
          ref="province"
          :required="true"
          :autoload="false"
          :disabled="!o.region"
          @input="$refs.district.load({ code: o.provincia })"
        >
          <option>Select One...</option>
          <v-options store="province" value-field="code" display-field="name" />
        </v-select>
        <label>Distrito:</label>
        <v-select
          v-model="o.distrito"
          ref="district"
          :autoload="false"
          store="district_selected"
          @input="$refs.cp.load({ id: o.distrito })"
          :disabled="!o.provincia"
          name="district"
          required="required"
        >
          <option value="">Select One...</option>
          <v-options store="district" value-field="code" display-field="name" />
        </v-select>
        <label>Centro Poblado:</label>
        <v-select
          ref="cp"
          v-on:input="changeTown(o.centro_poblado)"
          autoload="false"
          :disabled="!o.distrito"
          v-model="o.centro_poblado"
        >
          <option value="">Seleccionar Opci&oacute;n</option>
          <v-options store="town"  display-field="name" />
        </v-select>
        <label>Tipo:</label>
        <v-select v-model="o.urb_rur" required="true">
          <option value="">Seleccionar Opci&oacute;n</option>
          <option value="U">URBANO</option>
          <option value="R">RURAL</option>
        </v-select>
        <label>Conglomerado</label>
        <input v-model="o.conglomerado" />
        <template v-if="o.urb_rur == 'U'">
          <label>Zona</label>
          <input v-model="o.zona" />
          <label>Manzana</label>
          <input v-model="o.manzana" />
        </template>
        <label>Selección</label>
        <input v-model="o.seleccion" />
        <label>Vivienda</label>
        <input v-model="o.vivienda" />
        <label>Vivienda Suplementaria</label>
        <input v-model="o.vivienda_sup" />
        <label>Hogar</label>
        <v-number v-model="o.hogar" required="true" min="1" />
        <v-button
          style="margin-top: 10px"
          icon="fa-map"
          value="Obtener Geolocalización"
          v-on:click="printCurrentPosition"
        />
        <div
          v-if="(o.lat && o.lat != 0) || (o.lon && o.lon != 0) || trayLocation"
          style="
            margin-top: 10px;
            border: 1px solid #ffcf00;
            background-color: #ffff80;
            padding: 10px;
          "
        >
          ({{ o.lat }},{{ o.lon }})
        </div>
      </v-fieldset>
      <v-fieldset legend="DIRECCIÓN DE LA VIVIENDA">
        <label>Nombre de la Calle, Avenida, Jirón, Carretera</label>
        <input v-model="o.nombre_calle" />
        <label>Número</label>
        <input v-model="o.numero" />
        <label>Interior</label>
        <input v-model="o.interior" />
        <label>Piso</label>
        <input v-model="o.piso" />
        <label>Manzana</label>
        <input v-model="o.manzana_vivienda" />
        <label>Lote</label>
        <input v-model="o.lote" />
        <label>Km</label>
        <input v-model="o.km" />
        <label>Teléfono</label>
        <input v-model="o.telefono" />
      </v-fieldset>
      <v-fieldset legend="DATOS DEL INFORMANTE">
        <label>Nombre del informante</label>
        <v-textarea v-model="o.informant" maxlength="100" />
        <label>Es jefe/a del hogar</label>
        <v-radio-group v-model="o.is_boss_house">
          <v-radio value="Si" />
          <v-radio value="No" />
        </v-radio-group>
        <template v-if="o.is_boss_house==='Si'">
          <label>¿Cuál es relación que mantiene con el jefe/a de hogar?</label>
          <v-radio-group v-model="o.relation_with_boss_house">
            <v-radio value="1" label="Es el jefe/a de hogar" />
            <v-radio value="2" label="Esposo/a, compañero/a, conviviente del/la jefe/a de hogar"/>
            <v-radio value="3" label="Hijo/a, Hijastro/a del/la jefe/a de hogar"/>
            <v-radio value="4" label="Yerno/nuera del/la jefe/a de hogar" />
            <v-radio value="5" label="Padres/suegros del/la jefe/a de hogar" />
            <v-radio value="6" label="Hermano/a del/la jefe/a de hogar" />
            <v-radio value="7" label="Otros parientes del/la jefe/a de hogar" />
          </v-radio-group>
        </template>
      </v-fieldset>
      <div class="xyz" v-if="o.id">
        <a :href="'/admin/poll/' + (o.tmpId ? -o.tmpId : o.id) + '/a'"
          ><b>SECCIÓN A: CARACTERÍSTICAS Y SITUACIÓN DE LA VIVIENDA</b> [Responde solo
          el jefe de hogar]</a
        >
        <a :href="'/admin/poll/' + (o.tmpId ? -o.tmpId : o.id) + '/peoples'"
          ><b>SECCIÓN B: CARACTERÍSTICAS SOCIODEMOGRÁFICAS I</b>
          [Idealmente responden todos los miembros del hogar mayores de 12 años y
           para aquellos por debajo de dicho rango etario, el jefe/a brinda la información
            requerida. No obstante, de no poder cumplirse tal condición, el/la jefe/a puede
             brindar información por todos los demás miembros del hogar] - 
             <b>SECCIÓN C: FUENTES DE INGRESO</b> [Debe ser respondida por todo miembro del hogar mayor de 14 años de edad ]</a
        >
        <a :href="'/admin/poll/' + (o.tmpId ? -o.tmpId : o.id) + '/d'"
          ><b>SECCIÓN D: CARACTERÍSTICAS SOCIODEMOGRÁFICAS II</b> [Debe ser respondida
          por el jefe/a de hogar]</a
        >
        <a :href="'/admin/poll/' + (o.tmpId ? -o.tmpId : o.id)+'/e'"
          ><b>SECCIÓN E: MÓDULO DE EDUCACIÓN</b> [Idealmente debe ser respondida por
          todos los miembros del hogar mayores de 12 años matriculados en la
          educación básica o superior y/o por el jefe/a de hogar para los
          miembros del hogar menores de 12 años. De no ser así, la información
          puede ser provista solamente por el/la jefe/a de hogar]</a
        >
        <a :href="'/admin/poll/' + (o.tmpId ? -o.tmpId : o.id) + '/f'"
          ><b>SECCIÓN F: MÓDULO DE SALUD</b> [Debe ser respondida por el jefe/a de
          hogar] - <b>SECCIÓN G: MÓDULO DE SEGURIDAD ALIMENTARIA</b> [Debe ser respondida por
          el jefe/a de hogar]</a
        >
        <a :href="'/admin/poll/' + (o.tmpId ? -o.tmpId : o.id) + '/h'"
          ><b>SECCIÓN H: OFERTA DE FUERZA DE TRABAJO Y PERCEPCIÓN DE INGRESOS</b> -  
          <b>SECCIÓN I. EMPRENDIMIENTO</b>
        </a>
        <a :href="'/admin/poll/' + (o.tmpId ? -o.tmpId : o.id) + '/j'"
          >SECCIÓN J: ACTIVIDADES AGROPECUARIAS</a
        >
        <a :href="'/admin/poll/' + (o.tmpId ? -o.tmpId : o.id) + '/k'"
          >SECCIÓN K: REDES SOCIALES Y MOVILIDAD EN EL TERRITORIO</a
        >
      </div>
    </v-form>
  </ion-content>
</template>
<script>
import { IonContent } from "@ionic/vue";
import { Geolocation } from "@capacitor/geolocation";
//import M from "minimatch";

var axios = window.axios;
export default window._.ui({
  components: { IonContent },
  props: ["id"],
  data() {
    return {
      trayLocation: null,
      regionList: [],
      provinceList: [],
      districtList: [],
      townList: [],
      o: {
        id: null,
        region: null,
        provincia: null,
        distrito: null,
        centro_poblado: null,
        is_boss_house:null,
        urb_rur:null,
        lat: null,
        lon: null,
        people: [],
      },
    };
  },
  mounted() {
    var me=this;
    me.$on('sync',me.app.onSyncPoll);
    me.changeRoute();
  },
  updated() {
    window.app.bindLinks(this.$el);
  },
  methods: {
    async changeRoute() {
      var me = this;
      if (me.id < 0||me.id>0&&!me.app.connected) {
        me.getStoredList("poll").then((poll) => {
          poll.forEach((e) => {
            if (e.tmpId == Math.abs(me.id)||e.id==me.id) {
              me.o = e;
              me.trayLocation = e.lat && e.lon;
            }
          });
        });
      } else if (me.id) {
        axios
          .get("/api/poll/" + me.id, { params: { poll: me.app.poll } })
          .then((d) => {
            me.o = d.data;
          });
      } else {
        try {
          var s = JSON.parse(localStorage.getItem("setting")),
            o = me.o;
          o.region = s.region.id;
          o.provincia = s.province.code;
          o.distrito = s.district.code;
          o.centro_poblado=s.town.id;
        } catch (e) {
          console.error(e);
        }
      }
      me.removeStored("people");
    },
    process(o) {
      var me = this;
      o.poll = me.app.poll;
      if (!me.trayLocation) {
        me.MsgBox("Debe tratar de obtener la geolocalización.");
        return false;
      }
      return o;
    },
    changeTown(v) {
      var me=this;
      if(v){
				me.getStoredList('sample').then((towns)=>{
          towns.forEach((town)=>{
            if(v==town.code){
              if(!me.o.urb_rur)
              me.o.urb_rur=town.tipo;
            }
          })
        })}
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
.xyz {
  padding: 0px !important;
}
.xyz > a {
  padding: 10px;
  background-color: #e1f8ff;
  border: 1px solid gray;
  margin-top: 10px;
  display: block;
}
</style>