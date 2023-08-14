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
          class="fa fa-coins"
          style="position: absolute; left: 2px; top: 3px"
        ></i>
        SECCIÓN H: OFERTA DE FUERZA DE TRABAJO Y PERCEPCIÓN DE INGRESOS [Debe
        ser respondida por el jefe/a de hogar]
      </h2>
      <div>ID={{ o.id }}</div>
      <label>Situación de empleo de los jefes de hogar</label>
      <v-fieldset
        legend="49. LA SEMANA PASADA, ¿TRABAJÓ AL MENOS UNA HORA POR ALGÚN PAGO EN DINERO O ESPECIE? (SIN CONTAR LOS QUEHACERES DEL HOGAR)"
      >
        <v-radio-group v-model="o.p_49">
          <v-radio value="1" label="Si [Pase a p54]" />
          <v-radio value="2" label="No" />
        </v-radio-group>
      </v-fieldset>
      <v-fieldset
        legend="50. AUNQUE NO TRABAJÓ LA SEMANA PASADA, ¿TIENE UN EMPLEO FIJO AL QUE PROXIMAMENTE VOLVERÁ?"
      >
        <v-radio-group v-model="o.p_50">
          <v-radio value="1" label="Si [Pase a p54]" />
          <v-radio value="2" label="No" />
        </v-radio-group>
      </v-fieldset>
      <v-fieldset
        legend="51. AUNQUE NO TRABAJÓ LA SEMANA PASADA, ¿TIENE ALGÚN NEGOCIO PROPIO QUE PRÓXIMAMENTE VOLVERÁ?"
      >
        <v-radio-group v-model="o.p_51">
          <v-radio value="1" label="Si [Pase a p54]" />
          <v-radio value="2" label="No" />
        </v-radio-group>
      </v-fieldset>
      <v-fieldset
        legend="52. ¿HA HECHO ALGO PARA CONSEGUIR TRABAJO LA SEMANA PASADA?"
      >
        <v-radio-group v-model="o.p_52">
          <v-radio value="1" label="Si" />
          <v-radio value="2" label="No" />
        </v-radio-group>
      </v-fieldset>
      <v-fieldset legend="53. LA SEMANA PASADA, ¿QUERÍA USTED TRABAJAR?">
        <v-radio-group v-model="o.p_53">
          <v-radio value="1" label="Si [Pase a p63]" />
          <v-radio value="2" label="No" />
        </v-radio-group>
      </v-fieldset>
      <label
        >Situación de empleo en la ocupación principal de los jefes de
        hogar</label
      >
      <v-fieldset
        legend="54. ¿EN QUÉ SECTOR DE ACTIVIDAD SE DESEMPEÑO COMO OCUPACIÓN PRINCIPAL?"
      >
        <v-radio-group v-model="o.p_54">
          <v-radio value="1" label="Agrícola" />
          <v-radio value="2" label="Pecuario" />
          <v-radio value="3" label="Pesca" />
          <v-radio value="4" label="Minería" />
          <v-radio value="5" label="Manufactura" />
          <v-radio value="6" label="Construcción" />
          <v-radio value="7" label="Comercio" />
          <v-radio value="8" label="Transportes y comunicaciones" />
          <v-radio value="9" label="Servicios" />
        </v-radio-group>
      </v-fieldset>
      <v-fieldset
        legend="55. EN SU OCUPACIÓN PRINCIPAL, USTED SE DESEMPEÑO COMO?"
      >
        <v-radio-group v-model="o.p_55">
          <v-radio value="1" label="Empleador o patrono" />
          <v-radio value="2" label="Trabajador independiente" />
          <v-radio value="3" label="Empleado" />
          <v-radio value="4" label="Obrero [Pase a P56]" />
          <v-radio value="5" label="Trabajador familiar no remunerado [Pase a P56]"
          />
          <v-radio value="6" label="Trabajador del hogar [Pase a P56]" />
          <v-radio value="7" label="Otro" />
        </v-radio-group>
      </v-fieldset>
      <v-fieldset
        v-if="o.p_55 < 4 || o.p_55 > 6"
        legend="56. ¿TENÍA TRABAJADORES REMUNERADOS PERMANENTES A SU CARGO?"
      >
        <v-radio-group v-model="o.p_56">
          <v-radio value="1" label="Si" />
          <v-radio value="2" label="No" />
        </v-radio-group>
      </v-fieldset>
      <v-fieldset
        legend="57. EN SU OCUPACIÓN PRINCIPAL, CUÁNTAS HORAS TRABAJÓ LA SEMANA PASADA?"
      >
        <table width="100%" class="table">
          <tr>
            <td>1. Lunes</td>
            <td width="80">
              <v-number v-model="o.p_57_1" min="0" v-on:input="p_57(0)" />
            </td>
          </tr>
          <tr>
            <td>2. Martes</td>
            <td>
              <v-number v-on:input="p_57(0)" v-model="o.p_57_2" min="0" />
            </td>
          </tr>
          <tr>
            <td>3. Miércoles</td>
            <td>
              <v-number v-on:input="p_57(0)" v-model="o.p_57_3" min="0" />
            </td>
          </tr>
          <tr>
            <td>4. Jueves</td>
            <td>
              <v-number v-on:input="p_57(0)" v-model="o.p_57_4" min="0" />
            </td>
          </tr>
          <tr>
            <td>5. Viernes</td>
            <td>
              <v-number v-on:input="p_57(0)" v-model="o.p_57_5" min="0" />
            </td>
          </tr>
          <tr>
            <td>6. Sábado</td>
            <td>
              <v-number v-on:input="p_57(0)" v-model="o.p_57_6" min="0" />
            </td>
          </tr>
          <tr>
            <td>7. Domingo</td>
            <td width="50">
              <v-number v-model="o.p_57_7" v-on:input="p_57(0)" min="0" />
            </td>
          </tr>
          <tr>
            <td>8. Total</td>
            <td width="50"><v-number disabled="true" v-model="o.p_57_8" /></td>
          </tr>
        </table>
      </v-fieldset>
      <label
        >Situación de empleo en la ocupación secundaria de los jefes de
        hogar</label
      >
      <v-fieldset
        legend="58.  ADEMÁS DE SU OCUPACIÓN PRINCIPAL, ¿LA SEMANA PASADA TUVO USTED ALGÚN OTRO TRABAJO PARA OBTENER INGRESOS?"
      >
        <v-radio-group v-model="o.p_58">
          <v-radio value="1" label="Si" />
          <v-radio value="2" label="No" />
        </v-radio-group>
      </v-fieldset>
      <template v-if="o.p_58 == 1">
        <v-fieldset
          legend="59. ¿EN QUÉ SECTOR DE ACTIVIDAD SE DESEMPEÑO COMO OCUPACIÓN SECUNDARIA?"
        >
          <v-radio-group v-model="o.p_59">
            <v-radio value="1" label="Agrícola" />
            <v-radio value="2" label="Pecuario" />
            <v-radio value="3" label="Pesca" />
            <v-radio value="4" label="Minería" />
            <v-radio value="5" label="Manufactura" />
            <v-radio value="6" label="Construcción" />
            <v-radio value="7" label="Comercio" />
            <v-radio value="8" label="Transportes y comunicaciones" />
            <v-radio value="9" label="Servicios" />
          </v-radio-group>
        </v-fieldset>
        <v-fieldset
          legend="60. EN SU CENTRO DE TRABAJO SECUNDARIO, USTED SE DESEMPEÑO COMO?"
        >
          <v-radio-group v-model="o.p_60">
            <v-radio value="1" label="Empleador o patrono" />
            <v-radio value="2" label="Trabajador independiente" />
            <v-radio value="3" label="Empleado" />
            <v-radio value="4" label="Obrero" />
            <v-radio value="5" label="Trabajador familiar no remunerado" />
            <v-radio value="6" label="Trabajador del hogar" />
            <v-radio value="7" label="Otro" />
          </v-radio-group>
        </v-fieldset>
        <v-fieldset
          legend="61. EN SU OCUPACIÓN SECUNDARIA, CUÁNTAS HORAS TRABAJÓ LA SEMANA PASADA?"
        >
          <table width="100%" class="table">
            <tr>
              <td>Lunes</td>
              <td width="80">
                <v-number
                  v-model="o.p_61_1"
                  min="0"
                  v-on:input="p_61('p_61_')"
                />
              </td>
            </tr>
            <tr>
              <td>Martes</td>
              <td>
                <v-number
                  v-model="o.p_61_2"
                  min="0"
                  v-on:input="p_61('p_61_')"
                />
              </td>
            </tr>
            <tr>
              <td>Miércoles</td>
              <td>
                <v-number
                  v-model="o.p_61_3"
                  min="0"
                  v-on:input="p_61('p_61_')"
                />
              </td>
            </tr>
            <tr>
              <td>Jueves</td>
              <td>
                <v-number
                  v-model="o.p_61_4"
                  min="0"
                  v-on:input="p_61('p_61_')"
                />
              </td>
            </tr>
            <tr>
              <td>Viernes</td>
              <td>
                <v-number
                  v-model="o.p_61_5"
                  min="0"
                  v-on:input="p_61('p_61_')"
                />
              </td>
            </tr>
            <tr>
              <td>Sábado</td>
              <td>
                <v-number
                  v-model="o.p_61_6"
                  min="0"
                  v-on:input="p_61('p_61_')"
                />
              </td>
            </tr>
            <tr>
              <td>Domingo</td>
              <td>
                <v-number
                  v-model="o.p_61_7"
                  min="0"
                  v-on:input="p_61('p_61_')"
                />
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td><v-number disabled="true" v-model="o.p_61_8" /></td>
            </tr>
          </table>
        </v-fieldset>
      </template>
      <v-fieldset
        legend="62. ¿A CUÁNTO ASCENDIO SU INGRESO? [Revisar notas 1 y 2 antes de llenar este recuadro]"
      >
        <table width="100%" class="jtable table center">
          <tr>
            <td colspan="2">Ingreso total y/o ganancia neta</td>
          </tr>
          <tr>
            <td>P61A: Ocupación Principal</td>
            <td>
              <template v-if="o.p_58 == 1">P61B: Ocupación Secundaria</template>
            </td>
          </tr>
          <tr>
            <td><v-number v-model="o.p_62_1" /></td>
            <td><v-number v-if="o.p_58 == 1" v-model="o.p_62_2" /></td>
          </tr>
        </table>
      </v-fieldset>
      <label>Ingresos totales, gastos y protección social en el hogar</label>
      <v-fieldset
        legend="63. EN LOS ÚLTIMOS 12 MESES, ¿A CUÁNTO ASCENDIÓ EL INGRESO PROMEDIO MENSUAL DEL HOGAR? (en nuevos soles)"
      >
        <v-number v-model="o.p_63" />
      </v-fieldset>
      <v-fieldset
        legend="64. ¿ACTUALMENTE ESTÁ USTED AFILIADO A ALGÚN SEGURO DE SALUD?"
      >
        <v-radio-group v-model="o.p_64">
          <v-radio value="1" label="Si" />
          <v-radio value="2" label="No" />
        </v-radio-group>
      </v-fieldset>
      <v-fieldset
        legend="65. ¿CUÁL ES SU RELACIÓN CON EL SISTEMA DE PENSIONES?"
      >
        <v-radio-group v-model="o.p_65">
          <v-radio value="1" label="Estoy afiliado y aporto regularmente" />
          <v-radio
            value="2"
            label="Estoy afiliado pero no aporto con regularidad"
          />
          <v-radio
            value="3"
            label="Estoy afiliado y retire los fondos de pensión que tenía disponible"
          />
          <v-radio
            value="4"
            label="No estoy afiliado al sistema de pensiones"
          />
        </v-radio-group>
      </v-fieldset>
      <v-fieldset
        legend="66. EN SU HOGAR, ¿CUÁNTO SE GASTA MENSUALMENTE EN LOS SIGUIENTES BIENES?"
      >
        <table width="100%" class="table">
          <tr>
            <td>1. Alimentos y bebidas en el hogar</td>
            <td width="80"><v-number v-model="o.p_66_1" /></td>
          </tr>
          <tr>
            <td>2. Alimentos fuera del hogar</td>
            <td><v-number v-model="o.p_66_2" /></td>
          </tr>
          <tr>
            <td>3. Prendas de vestir y calzado</td>
            <td width="50"><v-number v-model="o.p_66_3" /></td>
          </tr>
          <tr>
            <td>4. Alquiler de vivienda</td>
            <td width="50"><v-number v-model="o.p_66_4" /></td>
          </tr>

          <tr>
            <td>5. Pasajes</td>
            <td><v-number v-model="o.p_66_4" /></td>
          </tr>
          <tr>
            <td>6. Muebles, enseres y mantenimiento</td>
            <td><v-number v-model="o.p_66_6" /></td>
          </tr>
          <tr>
            <td>7. Servicio de energía eléctrica</td>
            <td><v-number v-model="o.p_66_7" /></td>
          </tr>
          <tr>
            <td>8. Servicio de agua</td>
            <td><v-number v-model="o.p_66_8" /></td>
          </tr>
          <tr>
            <td>9. Servicio de teléfono</td>
            <td width="50"><v-number v-model="o.p_66_9" /></td>
          </tr>
          <tr>
            <td>10. Salud</td>
            <td width="50"><v-number v-model="o.p_66_10" /></td>
          </tr>
          <tr>
            <td>11. Educación</td>
            <td><v-number v-model="o.p_66_11" /></td>
          </tr>
          <tr>
            <td>12. Artículos de limpieza</td>
            <td><v-number v-model="o.p_66_12" /></td>
          </tr>
          <tr>
            <td>13. Esparcimiento</td>
            <td><v-number v-model="o.p_66_13" /></td>
          </tr>
          <tr>
            <td>14. Otros gastos</td>
            <td width="50"><v-number v-model="o.p_66_14" /></td>
          </tr>
        </table>
      </v-fieldset>
      <label>SITUACIÓN DEL EMPLEO EN PANDEMIA</label>
      <v-fieldset
        legend="67. ¿ENTRE MARZO DEL 2020 Y LA FECHA ACTUAL, SU CONDICIÓN LABORAL RESPONDE A ALGUNA DE LAS SIGUIENTES CARACTERÍSTICAS?"
      >
        <v-radio-group v-model="o.p_67">
          <v-radio value="1"
            label="Fue despedido por cierre de la empresas por el coronavirus"
          />
          <v-radio value="2"
            label="Fue despedido por reducción de la empresa por el coronavirus"
          />
          <v-radio value="3"
            label="Renunció voluntariamente por temor a contagio del coronavírus"
          />
          <v-radio value="4" label="Término de contrato/trabajo temporal" />
          <v-radio value="5"
            label="No renovaron su contrato por suspensión de labores de su empresa"
          />
          <v-radio
            value="6"
            label="Fue despedido por presentar síntomas del coronavirus"
          />
          <v-radio
            value="7"
            label="Cierre del negocio propio o familiar por aislamiento social obligatorio"
          />
          <v-radio
            value="8"
            label="No pudo continuar prestando sus servicios de forma independiente por el aislamiento social"
          />
          <v-radio
            value="9"
            label="Por desabastecimiento del negocio propio por falta de transporte"
          />
          <v-radio value="10" label="Otras condiciones" />
        </v-radio-group>
      </v-fieldset>
      <h2
        style="
          padding-left: 34px;
          margin-bottom: 20px;
          margin-top: 20px;
          position: relative;
          font-size: 24px;
          background-color: transparent;
        "
      >
        I. EMPRENDIMIENTO
      </h2>
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
    p_57(id){
      var p=id||57;
      var o=this.o;
      var v=0;
      for(var k=1;k<=7;k++)
        v=v+1*(o['p_'+p+'_'+k]||0);
      o['p_'+p+'_8']=v;
    },
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