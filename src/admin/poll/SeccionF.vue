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
      action="/api/poll"
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
        <i
          class="fa fa-heart"
          style="position: absolute; left: 2px; top: 3px"
        ></i>
        SECCIÓN F: MÓDULO DE SALUD (Responde solo el jefe de hogar)
      </h2>
      <div :class="o.id < 0 ? 'yellow' : ''">ID={{ o.id }}</div>
      <v-fieldset
        legend="40. EN EL ÚLTIMO AÑO USTED O ALGUNO DE LOS MIEMBROS QUE RESIDEN EN SU HOGAR FUERON DIAGNÓSTICADOS CON COVID-19?"
      >
        <v-radio-group v-model="o.p_40">
          <v-radio value="1" label="Si [Pase a p41]" />
          <v-radio value="2" label="No [Pase a p46]" />
        </v-radio-group>
      </v-fieldset>
      <template v-if="o.p_40 == 1">
        <v-fieldset
          legend="41. ¿CUÁNTOS MIEMBROS DE SU HOGAR FUERON DIAGNÓSTICADOS CON COVID-19?"
        >
          <v-number v-model="o.p_41" />
        </v-fieldset>
        <v-fieldset
          legend="42. ¿USTED O ALGUNO DE LOS MIEMBROS DE SU HOGAR DESARROLLO SÍNTOMAS DE LA ENFERMEDAD?"
        >
          <v-radio-group v-model="o.p_42">
            <v-radio value="1" label="Si [Pase a p43]" />
            <v-radio value="2" label="No [Pase a p46]" />
          </v-radio-group>
        </v-fieldset>
      
      <template v-if="o.p_42 == 1">
        <v-fieldset
          legend="43. DE HABER DESARROLLADO SÍNTOMAS Y REQUERIDO ATENCIÓN MÉDICA, ¿DÓNDE SE ATENDIERON USTED O LOS MIEMBROS DE SU HOGAR?"
        >
          <v-checkbox v-model="o.p_43_1"
            label="Centro o puesto de salud MINSA"
          />
          <v-checkbox v-model="o.p_43_2"
            label="Centro o puesto de salud CLAS"
          />
          <v-checkbox v-model="o.p_43_3"
            label="Centro o puesto de salud ESSALUD"
          />
          <v-checkbox v-model="o.p_43_4"
            label="Hospital MINSA, CLAS, ESSALUD, FFAA o de la Policía Nacional"
          />
          <v-checkbox v-model="o.p_43_5" label="Consultório médico particular o clínica particular "
          />
          <v-checkbox v-model="o.p_43_6" label="Farmacia o botica" />
          <v-checkbox v-model="o.p_43_7" label="Su domicilio" />
          <v-checkbox v-model="o.p_43_8" label="Otro" />
          <v-checkbox v-model="o.p_43_9" label="No buscó atención" />
        </v-fieldset>
        <v-fieldset
          legend="44. ¿A CUÁNTO ASCENDIERON LOS GASTOS DESTINADOS A LA CURACIÓN SUYA O DE SUS FAMILIARES? (En nuevos soles)"
        >
          <v-number v-model="o.p_44" />
        </v-fieldset>
        
        <v-fieldset
          legend="45. ¿ALGUNO DE SUS FAMILIARES FALLECIÓ PRODUCTO DE LAS COMPLICACIONES DEL COVID-19?"
        >
          <v-radio-group v-model="o.p_45">
            <v-radio value="1" label="Si" />
            <v-radio value="2" label="No" />
          </v-radio-group>
        </v-fieldset>
      </template>
    </template>
      <v-fieldset
        legend="46. EN GENERAL, ¿QUÉ IMPLICÓ PARA USTED O SU FAMILIA EL COVID-19? (aplica más de una alternativa)"
      >
        <v-checkbox
          v-model="o.p_46_1"
          label="Dejar de trabajar por un tiempo sin salario"
        />
        <v-checkbox v-model="o.p_46_2" label="Perder mi empleo" />
        <v-checkbox v-model="o.p_46_3"
          label="Ejercer labores de docente acompañando las clases a distancia de mis hijos"
        />
        <v-checkbox v-model="o.p_46_4"
          label="Seguir trabajando sin tener contacto con otras personas distintas a las de mi hogar"
        />
        <v-checkbox v-model="o.p_46_5"
          label="Seguir trabajando manteniendo contacto con otras personas distintas a las de mi hogar"
        />
        <v-checkbox v-model="o.p_46_6" label="Gastar mis ahorros" />
        <v-checkbox v-model="o.p_46_7" label="Adquirir deuda" />
        <v-checkbox
          v-model="o.p_46_8"
          label="Ser internado en un hospital o clínica"
        />
        <v-checkbox
          v-model="o.p_46_9"
          label="Adquirir balones o tanques de oxígeno"
        />
        <v-checkbox
          v-model="o.p_46_10"
          label="Reducir el gasto destinado a alimentos"
        />
        <v-checkbox
          v-model="o.p_46_11"
          label="Hacerme cargo de los hijos y/o dependientes de otros parientes a consecuencia de orfandad o discapacidad inducida por el COVID-19"
        />
      </v-fieldset>
   
      <h2 
			style="margin-right: 50px;padding-left: 34px;margin-bottom:20px;margin-top:20px;position: relative;font-size: 24px;background-color: transparent;">
			
			SECCIÓN G: Módulo de Seguridad Alimentaria  [Debe ser respondida por el jefe/a de hogar]</h2>
			<div :class="o.id<0?'yellow':''">ID={{o.id}}</div>
			<v-fieldset legend="47. PARA OBTENER ALIMENTOS, ¿EN CUÁL DE LAS SIGUIENTES SITUACIONES SE ENCUENTRA SU HOGAR? [marcar más de una opción de corresponder]">
				<v-radio-group v-model="o.p_47" >
					<v-radio value="1" label="Solamente hace uso de sus ingresos monetarios (compra en el mercado)"/>
					<v-radio value="2" label="Solamente consume los alimentos que el hogar produce (autoconsumo)"/>
					<v-radio value="3" label="Una parte de los alimentos son comprados y la otra parte son producidos por el hogar"/>
					<v-radio value="4" label="Los ingresos o la producción de alimentos son insuficientes y se reciben alimentos de algún programa social (vaso de leche, Kali Warma, comedor popular, etc)"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset legend="48. ¿CUÁL DE LAS SIGUIENTES AFIRMACIONES REFLEJA MEJOR LA SITUACIÓN DE ALIMENTACIÓN DE LA FAMILIA?">
				<v-radio-group v-model="o.p_48" >
					<v-radio value="1" label="El consumo de alimentos es suficiente o adecuado"/>
					<v-radio value="2" label="El consumo familiar de alimentos algunas veces es insuficiente"/>
					<v-radio value="3" label="El consumo familiar de alimentos es permanentemente insuficiente"/>
				</v-radio-group>
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
    return { o: { id: null, synchronized: null } };
  },
  created() {
    var me = this;
    if (me.id < 0) {
      me.getStoredList("poll").then((polls) => {
        polls.forEach((e) => {
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
.cart-control > * {
  display: block;
  width: 90%;
}
.controls a:not(:last-child) {
  display: inline-block;
  margin-right: 10px;
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