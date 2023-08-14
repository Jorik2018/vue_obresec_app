<template>
  <ion-content :scroll-events="true">
    <v-form
      style="padding: 10px"
      class="v-form"
      :class="o.id < 0 ? 'yellow' : o.tmpId ? 'green' : ''"
      store="poll"
      action="/api/poll"
    >
      <span class="v-button-top-float" v-on:click="save"
        ><i class="fa fa-save"></i
      ></span>
      <h2
        style="
          padding-left: 34px;
          margin-bottom: 20px;
          position: relative;
          font-size: 24px;
          background-color: transparent;
        "
      >
        <i
          class="fa fa-tree"
          style="position: absolute; left: 2px; top: 3px"
        ></i>
        I. EMPRENDIMIENTO
      </h2>
      <div>ID={{ o.id }}</div>
      <label>Situación de empleo de los jefes de hogar</label>
      <v-fieldset
        legend="68.  ¿USTED TIENE ALGÚN NEGOCIO DE ÍNDOLE NO-AGRÍCOLA EN EL QUE HAYA INVERTIDO SU PROPIO CAPITAL?"
      >
        <v-radio-group v-model="o.p_68">
          <v-radio value="1" label="Si" />
          <v-radio value="2" label="No" />
        </v-radio-group>
      </v-fieldset>
      <v-fieldset
        legend="69. ¿CUÁL ES EL SECTOR DE ACTIVIDAD DE SU NEGOCIO NO-AGRÍCOLA?"
      >
      <v-radio-group v-model="o.p_69" >
					<v-radio value="1" label="Pecuario"/>
					<v-radio value="2" label="Pesca"/>
					<v-radio value="3" label="Minería"/>
					<v-radio value="4" label="Manufactura"/>
					<v-radio value="5" label="Construcción"/>
					<v-radio value="6" label="Comercio"/>
					<v-radio value="7" label="Transportes y comunicaciones"/>
					<v-radio value="8" label="Servicios"/>
				</v-radio-group>
      </v-fieldset>
      <v-fieldset
        legend="70. ¿CUÁL ES EL INGRESO MENSUAL PROMEDIO QUE OBTIENE EN SU EMPRENDIMIENTO NO-AGRÍCOLA? (En nuevos soles)"
      >
        <v-number v-model="o.p_70"/>
      </v-fieldset>
    </v-form>
  </ion-content>
</template>
<script>
import { IonContent } from "@ionic/vue";
export default window._.ui({
  components: { IonContent },
  props: ["id"],
  data() {
    return {
      trayLocation: null,
      s: {},
      options: {
        vegetable: [
          "Papa blanca",
          "Maíz Amiláceo",
          "Trigo",
          "Alfalfa",
          "Papa Huayro",
          "Haba",
          "Cebada grano",
          "Papa nativa",
          "Maíz choclo",
          "Oca",
          "Papa amarilla",
          "Olluco",
          "Avena forrajera",
          "Otro cultivo",
        ],
        regime: [
          "Propia",
          "Alquilada",
          "En usufructo",
          "Propia por herencia/sucesión",
          "Otro régimen",
          "No tiene tierras",
        ],
        destiny: ["Venta", "Autoconsumo", "Mixta (Venta y autoconsumo)"],
        destinySell: [
          "Venta en la misma localidad/comunidad/centro poblado",
          "Venta fuera de la localidad/comunidad/centro poblado",
          "Mercado local (feria local, centro de acopio local)",
          "Mercado regional (feria regional, centro de acopio regional)",
          "Mercado exterior",
          "Agroindustria",
          "Mercados de Lima",
        ],
      },
      o: { id: null, synchronized: null },
      count: 0,
      img: 0,
    };
  },
  created() {
    var me = this;
    if (me.id < 0) {
      me.getStoredList("poll").then((poll) => {
        poll.forEach((e) => {
          if (e.tmpId == Math.abs(me.id)) {
            me.o = e;
          }
        });
      });
    } else if (me.id)
      window.axios
        .get("/api/poll/" + me.id, { params: { poll: me.app.poll } })
        .then((d) => {
          me.o = d.data;
        });
  },
  methods: {
    process(o) {
      o.poll = this.app.poll;
      return o;
    },
    close(o) {
      if (o.data.id) this.o.id = o.data.id;
    },
  },
});
</script>
<style scope>
.table input {
  width: 100% !important;
}
.table td {
  padding: 2px;
}
.ww > a:not(:last-child) {
  margin-bottom: 20px;
}
.ww > a {
  display: block;
  border: 1px solid gray;
  padding: 10px;
}
.ww span {
  font-size: 16px;
  font-weight: bolder;
}
.ww i {
  font-size: 14px;
  color: gray;
  display: block;
}
.ww div {
  display: inline-block;
  width: calc(100% - 100px);
  padding-top: 20px;
  float: left;
}
.ww img {
  width: 100px;
}
img.error {
  padding: 30% !important;
  width: 40% !important;
  background-color: transparent;
}
.cart-control > * {
  display: block;
  width: 90%;
}
.cart-control > *:not(:last-child) {
  margin-bottom: 10px;
}
.controls a:not(:last-child) {
  display: inline-block;
  margin-right: 10px;
}
.product {
  padding: 20px;
  background-color: white;
  position: relative;
}
.product-list iframe {
  width: 100%;
}
.controls {
  position: relative;
}
.controls > *:not(:last-child) {
  margin-right: 10px;
}
fieldset > div {
  padding: 10px;
}
.view {
  margin: 15px 0px;
}
.inner-scroll {
  --padding: 10px;
}
.v-fieldset {
  border: 1px solid #0f62ac;
}
.v-controls {
  font-size: 30px;
}
</style>