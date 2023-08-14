<template>
	<ion-content :scroll-events="true">
		<v-form style="padding:10px;" class="v-form" :class="o.id<0?'yellow':(o.tmpId?'green':'')" 
		store="poll" action="/api/poll">
			<span class="v-button-top-float" v-on:click="save"><i class="fa fa-save"></i></span>
			<h2 
			style="padding-left: 34px;margin-bottom:20px;position: relative;font-size: 24px;background-color: transparent;">
			<i class="fa fa-tree" style="position: absolute; left: 2px; top: 3px;"></i>
			J. ACTIVIDADES AGROPECUARIAS</h2>
			<div >ID={{o.id}}</div>
			<v-fieldset legend="71. RÉGIMEN DE TENENCIA: ¿LA MAYORÍA DE SUS TIERRAS SON?">
				<label>Área Agrícola</label>
				<v-select v-model="o.p_71_1" >
				<option>--SELECCIONAR--</option>
				<option v-for="(value,key) in options.regime" :key="'p_71_1_'+key" :value="key+1">{{value}}</option>
				</v-select>
				<label>Área de Pastos</label>
				<v-select v-model="o.p_71_2" >
					<option value="">--SELECCIONAR--</option>
					<option v-for="(value,key) in options.regime" :key="'p_71_2_'+key" :value="key+1">{{value}}</option>
				</v-select>
				<label>Área Forestal</label>
				<v-select v-model="o.p_71_3" >
				<option>--SELECCIONAR--</option>
				<option v-for="(value,key) in options.regime" :key="'p_71_3_'+key" :value="key+1">{{value}}</option>
				</v-select>
			</v-fieldset>
			<v-fieldset v-if="o.p_71_1||o.p_71_2||o.p_71_3" legend="72. ¿CUÁL ES EL ÁREA TOTAL DEL TERRENO?">
				<template v-if="o.p_71_1&&o.p_71_1<6">
					<label>Área Agrícola</label>
					<v-number v-model="o.p_72_1"/>
				</template>
				<template v-if="o.p_71_2&&o.p_71_2<6">
					<label>Área de Pastos</label>
					<v-number v-model="o.p_72_2"/>
				</template>
				<template v-if="o.p_71_3&&o.p_71_3<6">
					<label>Área Forestal</label>
					<v-number v-model="o.p_72_3"/>
				</template>
			</v-fieldset>
			<label>CULTIVOS AGRÍCOLAS: SEÑALAR CUÁLES SON LOS CINCO PRINCIPALES CULTIVOS AGRÍCOLAS EN ORDEN DE RELEVANCIA</label>
			
			<v-fieldset legend="73. PRINCIPALES CULTIVOS SEGÚN ORDEN DE RELEVANCIA">
				<template v-for="(v,i) in options.vegetable">
					<v-checkbox :key="'ck-'+i" v-model="o['p_73_'+(i+1)]" :label="v"/>
					<v-fieldset :key="'fs-'+i" v-if="o['p_73_'+(i+1)]" :legend="'PREGUNTAS 74-80 para '+v" closable="true">
						<label>74. ¿HACE CUÁNTOS AÑOS SE DEDICA AL CULTIVO DE {{v}}?</label>
						<v-number v-model="o['p_74_'+(i+1)]"/>
						<label>75. ¿CUÁNTAS HECTÁREAS TIENE SEMBRADAS DURANTE EL ÚLTIMO AÑO?</label>
						<v-number v-model="o['p_75_'+(i+1)]"/>
						<label>76. ¿CUÁNTAS HECTÁREAS DE CULTIVO COSECHÓ DURANTE EL ÚLTIMO AÑO?</label>
						<v-number v-model="o['p_76_'+(i+1)]"/>
						<label>77. DE LAS HECTÁREAS COSECHADAS, ¿QUÉ CANTIDAD OBTUVO DURANTE EL ÚLTIMO AÑO? [Especificar la unidad de medida en KG o TN]</label>
						<input v-model="o['p_77_'+(i+1)]"/>
						<label>78. DEL TOTAL DE SU PRODUCCIÓN DE CULTIVOS, LA MAYOR PARTE VA PARA:</label>
						<v-checkbox v-model="o['p_78_'+(i+1)+'_1']" label="Venta"/>
						<v-checkbox v-model="o['p_78_'+(i+1)+'_2']" label="Autoconsumo"/>
						<v-checkbox v-model="o['p_78_'+(i+1)+'_3']" label="Mixta (Venta y autoconsumo)"/>
						<v-checkbox v-model="o['p_78_'+(i+1)+'_4']" label="Semilla"/>
						<v-checkbox v-model="o['p_78_'+(i+1)+'_5']" label="Trueque"/>
						<v-checkbox v-model="o['p_78_'+(i+1)+'_6']" label="Alimento de animales"/>
						<template v-if="o['p_78_'+(i+1)+'_1']||o['p_78_'+(i+1)+'_3']">
							<label>79. DE LA PRODUCCIÓN AGRÍCOLA QUE VA A VENTA, LA VENTA LA REALIZÓ EN (aplica más de una opción):</label>
							<v-checkbox v-model="o['p_79_'+(i+1)+'_1']" label="Mercado local (feria local, centro de acopio local)"/>
							<v-checkbox v-model="o['p_79_'+(i+1)+'_2']" label="Mercado regional (feria regional, centro de acopio regional)"/>
							<v-checkbox v-model="o['p_79_'+(i+1)+'_3']" label="Mercado exterior"/>
							<v-checkbox v-model="o['p_79_'+(i+1)+'_4']" label="Agroindustria"/>
							<v-checkbox v-model="o['p_79_'+(i+1)+'_5']" label="Mercado de Lima"/>
							<label>80. ¿A CUÁNTO ASCENDIERON SUS INGRESOS PRODUCTO DE LA VENTA DE SU PRODUCCIÓN AGRÍCOLA DURANTE LA ÚLTIMA CAMPAÑA? (en nuevos soles)</label>
							<v-number v-model="o['p_80_'+(i+1)]" />
						</template>
					</v-fieldset>
				</template>
			</v-fieldset>
			<v-fieldset legend="81. ¿A CUÁNTO ASCENDIÓ GASTO ANUAL EN? (en nuevos soles)">
				<table width="100%" class="table">
					<tr><td>Abonos</td><td width="80"><v-number v-model="o.p_81_1"/></td></tr>
					<tr><td>Fertilizantes</td><td><v-number v-model="o.p_81_2"/></td></tr>
					<tr><td>Plaguicidas</td><td><v-number v-model="o.p_81_3"/></td></tr>
					<tr><td>Semillas certificada</td><td><v-number v-model="o.p_81_4"/></td></tr>
					<tr><td>Semillas corrientes</td><td><v-number v-model="o.p_81_5"/></td></tr>
					<tr><td>Agua</td><td><v-number v-model="o.p_81_6"/></td></tr>
					<tr><td>Jornaleros</td><td><v-number v-model="o.p_81_7"/></td></tr>
					<tr><td>Transporte</td><td><v-number v-model="o.p_81_8"/></td></tr>
					<tr><td>Alquiler de maquinaría</td><td><v-number v-model="o.p_81_9"/></td></tr>
					<tr><td>Otros</td><td><v-number v-model="o.p_81_10"/></td></tr>
				</table>
			</v-fieldset>
			<v-fieldset legend="82. ¿REALIZA LAS SIGUIENTES PRÁCTICAS AGRÍCOLAS?">
          <v-checkbox v-model="o.p_82_1" label="Realiza análisis de suelos?"/>
          <v-checkbox v-model="o.p_82_2" label="Hace rotación de cultivos para proteger los suelos?"/>
          <v-checkbox v-model="o.p_82_3" label="Determina la cantidad de agua que necesita sus cultivos antes de iniciar la campaña agrícola?"
          />
          <v-checkbox v-model="o.p_82_4" label="Mide la cantidad de agua que ingresa a su parcela?"
          />
          <v-checkbox v-model="o.p_82_5"
            label="Realiza el mantenimiento de su sistema de riego?"
          />
        </v-fieldset>
			<v-fieldset legend="83. PRINCIPALES CRIANZAS SEGÚN ORDEN DE RELEVANCIA">
				<template v-for="k in 5">
					<label :key="'l_'+k">Crianza {{k}}</label>
					<input :key="'i_'+k" v-model="o['p_83_'+k]"/>
					<v-fieldset :key="'f_'+k" v-if="o['p_83_'+k]" :legend="'PREG 84-89 para '+o['p_83_'+k]" closable="true">
						<label>84. ¿CUÁNTOS ANIMALES DOMÉSTICOS O CABEZAS DE GANADO TUVO EN SU HABER DURANTE LA ÚLTIMA CAMPAÑA?</label>
						<v-number v-model="o['p_84_'+k]"/>
						<label>85. SU PRODUCCIÓN PECUARIA VA PARA:</label>
						<v-select v-model="o['p_85_'+k]" >
							<option value="0">--SELECCIONAR--</option>
							<option v-for="(value,key) in options.destiny" 
								:key="'p_85_'+k+'_'+key" :value="key+1">{{value}}</option>
						</v-select>
						<template v-if="o['p_85_'+k]==1||o['p_85_'+k]==3">
							<label>86. DE LA PRODUCCIÓN PECUARIA QUE VA A VENTA, LA VENTA LA REALIZÓ EN (aplica más de una opción):</label>
							<v-checkbox v-model="o['p_86_'+k+'_1']" label="Donde cría sus animales"/>
							<v-checkbox v-model="o['p_86_'+k+'_2']" label="Mercado o Feria local"/>
							<v-checkbox v-model="o['p_86_'+k+'_3']" label="Matadero o camal local"/>
							<v-checkbox v-model="o['p_86_'+k+'_4']" label="Mercado o ferial regional"/>
							<v-checkbox v-model="o['p_86_'+k+'_5']" label="Matadero o camal regional"/>
							<v-checkbox v-model="o['p_86_'+k+'_6']" label="Matadero de Lima"/>
							<v-checkbox v-model="o['p_86_'+k+'_7']" label="Mercado exterior"/>
							<v-checkbox v-model="o['p_86_'+k+'_8']" label="Agroindustria"/>
							<v-checkbox v-model="o['p_86_'+k+'_9']" label="Mercado de Lima"/>
							<label>87. ¿CUÁL ES EL NUMERO DE ANIMALES DOMESTICO O CUÁNTAS CABEZAS DE GANADO CONSIGUIÓ VENDER DURANTE LA ÚLTIMA CAMPAÑA?</label>
							<v-number v-model="o['p_87_'+k]"/>
							<label>88. ¿A CUÁNTO ASCENDIERON SUS INGRESOS PRODUCTO DE LA VENTA DE SU PRODUCCIÓN PECUARIA DURANTE LA ÚLTIMA CAMPAÑA? (en nuevos soles)</label>
							<v-number v-model="o['p_88_'+k]"/>
						</template>
						<template v-if="o['p_85_'+k]==2||o['p_85_'+k]==3">
							<label>89.  ¿CUÁL ES EL NUMERO DE ANIMALES DOMESTICO O CUÁNTAS CABEZAS DE GANADO DE SU PROPIA PRODUCCIÓN UD. DESTINO PARA SU PROPIO CONSUMO DURANTE LA ÚLTIMA CAMPAÑA?</label>
							<v-number :key="'n_'+k" v-model="o['p_89_'+k]"/>
						</template>
					</v-fieldset>
				</template>
			</v-fieldset>
			<v-fieldset legend="90. ¿A CUÁNTO ASCENDIÓ GASTO ANUAL EN? (en nuevos soles)">
				<table width="100%" class="table">
					<tr><td>Alimentos para animales</td><td width="80"><v-number v-model="o.p_90_1"/></td></tr>
					<tr><td>Servicios veterinarios</td><td><v-number v-model="o.p_90_2"/></td></tr>
					<tr><td>Medicamentos/dosis para animales</td><td><v-number v-model="o.p_90_3"/></td></tr>
					<tr><td>Pago de peatones y/o trabajadores</td><td><v-number v-model="o.p_90_4"/></td></tr>
					<tr><td>Insumos adicionales para subproductos</td><td><v-number v-model="o.p_90_5"/></td></tr>
					<tr><td>Otros</td><td><v-number v-model="o.p_90_6"/></td></tr>
				</table>
			</v-fieldset>
			<v-fieldset legend="91. PRINCIPALES PRODUCTOS FORESTALES SEGÚN ORDEN DE RELEVANCIA">
				<template v-for="k in 5" >
					<label :key="'la_'+k">Producto {{k}}</label>
					<input :key="'in_'+k" v-model="o['p_91_'+k]"/>
					<v-fieldset :key="'fs_'+k" v-if="o['p_91_'+k]" :legend="'PREG 92-94 para '+o['p_91_'+k]" closable="true">
						<label>92. DEL TOTAL DE SU PRODUCCIÓN FORESTAL, LA MAYOR PARTE VA PARA:</label>
						<v-select v-model="o['p_92_'+k]" >
							<option value="0">--SELECCIONAR--</option>
							<option v-for="(value,key) in options.destiny" :key="key" :value="key+1">{{value}}</option>
						</v-select>
						<template v-if="o['p_92_'+k]==1||o['p_92_'+k]==3">
							<label>93. DE LA PRODUCCIÓN FORESTAL QUE VA A VENTA, CUÁL ES SU DESTINO:</label>
							<v-select v-model="o['p_93_'+k]" >
							<option value="0">--SELECCIONAR--</option>
							<option v-for="(value,key) in options.destinySell" :key="key" :value="key+1">{{value}}</option>
							</v-select>
							<label>94. ¿A CUÁNTO ASCENDIERON SUS INGRESOS PRODUCTO DE LA VENTA DE SU PRODUCCIÓN FORESTAL DURANTE LA ÚLTIMA CAMPAÑA? </label>
							<v-number v-model="o['p_94_'+k]"/>
						</template>
					</v-fieldset>
				</template>
			</v-fieldset>
			<v-fieldset legend="95. DURANTE LOS ÚLTIMOS 12 MESES, ¿HA RECIBIDO CAPACITACIÓN O ASISTENCIA TÉCNICA?">
				<v-radio-group v-model="o.p_95" >
					<v-radio value="1" label="Si, capacitación (cursos, charlas)"/>
					<v-radio value="2" label="Si, asistencia técnica"/>
					<v-radio value="3" label="Si, ambos"/>
					<v-radio value="4" label="No recibí"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset legend="96. ¿CÓMO IMPACTO EL CORONAVIRUS A SU PRODUCCIÓN AGRÍCOLA Y/O PECUARIA Y/O FORESTAL CON RESPECTO A LA CAMPAÑA DEL AÑO 2019? (aplica más de una opción)">
				<v-checkbox v-model="o.p_96_1" label="Redujo las cosechas"/>
				<v-checkbox v-model="o.p_96_2" label="Disminuyó la demanda por ganado"/>
				<v-checkbox v-model="o.p_96_3" label="Cayeron las ventas de productos agrícolas y/o pecuario"/>
				<v-checkbox v-model="o.p_96_4" label="Variaron los precios de venta de los productos agrícolas y/o pecuarias"/>
				<v-checkbox v-model="o.p_96_5" label="Se redujeron las previsiones de siembra y cosecha de la campaña 2021"/>
				<v-checkbox v-model="o.p_96_6" label="Se torno difícil acceder a insumos"/>
				<v-checkbox v-model="o.p_96_7" label="Fue complicado transportar insumos y/o productos agrícolas y/o pecuarios hacia los mercados de venta"/>
				<v-checkbox v-model="o.p_96_8" label="Hubo problemas para contratar jornaleros"/>
				<v-checkbox v-model="o.p_96_9" label="Los ingresos se redujeron"/>
				<v-checkbox v-model="o.p_96_10" label="Se usó ahorros  se adquirió deuda para afrontar la crisis"/>
			</v-fieldset>
		</v-form>
	</ion-content>
</template>
<script>
import {IonContent} from '@ionic/vue';
export default window._.ui({
	components:{IonContent},
	props:['id'],
	data(){return{
	trayLocation:null,
	s:{},options:{
	vegetable:[
		'Trigo',
		'Maíz Amarillo Duro',
		'Maíz amiláceo',
		'Arveja',
		'Palto',
		'Mango Criollo',
		'Mango Mejorado',
		'Papa',
		'Quinua',
		'Chocho',
		'Haba',
		'Ajo',
		'Cebolla',
		'Repollo',
		'Col',
		'Espinaca',
		'Lechuga',
		'Alcachofa',
		'Alfalfa',
		'Otro'
	],
	regime:['Propia','Alquilada','En usufructo','Propia por herencia/sucesión','Otro régimen','No tiene tierras'],
	destiny:['Venta','Autoconsumo','Mixta (Venta y autoconsumo)'],
	destinySell:['Venta en la misma localidad/comunidad/centro poblado','Venta fuera de la localidad/comunidad/centro poblado',
	'Mercado local (feria local, centro de acopio local)',
	'Mercado regional (feria regional, centro de acopio regional)',
	'Mercado exterior',
	'Agroindustria',
	'Mercados de Lima']
	},o:{id:null,synchronized:null},count:0,img:0}},
	created(){
		var me=this;
		if(me.id<0){
			me.getStoredList('poll').then((poll)=>{
				poll.forEach(e =>{
					if(e.tmpId==Math.abs(me.id)){me.o=e;}
				});
			});
		}else if(me.id)
			window.axios.get('/api/poll/'+me.id,{params:{poll:me.app.poll}}).then((d)=>{
				me.o=d.data;
			});
	},
	methods:{
		process(o){
			o.poll=this.app.poll;
			return o;
		},
		close(o){
			if(o.data.id)this.o.id=o.data.id;
		}
	}
});
</script>
<style scope>
	.table input{
		width:100% !important;
	}
	.table td{
		padding:2px;
	}
	.ww > a:not(:last-child){
		margin-bottom:20px;
	}
	.ww > a{
		display:block;
		border:1px solid gray;
		padding:10px;
	}
	.ww span{
		font-size:16px;
		font-weight:bolder;
	}
	.ww i{
		font-size:14px;
		color:gray;
		display:block;
	}
	.ww div{
		display: inline-block;
		width: calc(100% - 100px);
		padding-top: 20px;
		float: left;
	}
	.ww img{
		width:100px;
	}
	img.error{
		padding: 30% !important;
		width: 40% !important;
		background-color: transparent;
	}
	.cart-control > *{
		display:block;
		width:90%;
	}
	.cart-control > *:not(:last-child){
		margin-bottom:10px;
	}
	.controls a:not(:last-child){
		display:inline-block;
		margin-right:10px;
	}
	.product{
		padding:20px;background-color: white;
		position:relative;
	}
	.product-list iframe{
		width:100%;
	}
	.controls{
		position:relative;
	}
	.controls > *:not(:last-child){
		margin-right:10px;
	}
	fieldset > div{
		padding:10px;
	}
	.view{
		margin:15px 0px;
	}
	.inner-scroll{
		--padding:10px;
	}
	.v-fieldset {
		border: 1px solid #0f62ac;
	}
	.v-controls{
		font-size:30px;
	}
</style>