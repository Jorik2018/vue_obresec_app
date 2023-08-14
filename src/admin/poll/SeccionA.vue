<template>
	<ion-content :scroll-events="true">
		<v-form style="padding:10px;" class="v-form" :class="o.id<0||(o.tmpId&&!o.synchronized)?'yellow':(o.tmpId?'green':'')" 
			store="poll" action="/api/poll">
			<a class="v-button-top-float" v-on:click="save"><i class="fa fa-save"></i></a>	
			<h2 
			style="margin-right: 50px;padding-left: 34px;margin-bottom:20px;position: relative;font-size: 24px;background-color: transparent;">
			<i class="fa fa-home" style="position: absolute; left: 2px; top: 3px;"></i>
			SECCIÓN A: CARACTERÍSTICAS Y SITUACIÓN DE LA VIVIENDA [Responde solo el jefe de hogar]</h2>
			<div>ID={{o.id}}</div>
			<template v-if="o.hogar==1">
				<v-fieldset legend="0. Tipo De Vivienda">
					<v-radio-group v-model="o.p_0" >
						<v-radio value="1" label="Casa Independiente"/>
						<v-radio value="2" label="Departamento en edificio"/>
						<v-radio value="3" label="Vivienda en quinta"/>
						<v-radio value="4" label="Vivienda en casa de vecindad (callejón, solar o corralón)"/>
						<v-radio value="5" label="Choza o cabaña"/>
						<v-radio value="6" label="Vivienda improvisada"/>
						<v-radio value="7" label="Local no destinado para habitación humana"/>
						<v-radio value="8" label="Otro"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="1. ¿LA VIVIENDA QUE OCUPA SU HOGAR ES?">
					<v-radio-group v-model="o.p_1" >
						<v-radio value="1" label="Alquilada"/>
						<v-radio value="2" label="Propia, totalmente pagada"/>
						<v-radio value="3" label="Propia, por invasión"/>
						<v-radio value="4" label="Propia, comprándola a plazos"/>
						<v-radio value="5" label="Cedida por el centro de trabajo"/>
						<v-radio value="6" label="Cedida por otra institución"/>
						<v-radio value="7" label="Autoconstruida"/>
						<v-radio value="8" label="Otra forma"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="2. ¿EL MATERIAL PREDOMINANTE DE LOS PISOS ES?">
					<v-radio-group v-model="o.p_2" >
						<v-radio value="1" label="Parquet o madera pulida"/>
						<v-radio value="2" label="Lâminas asfálticas, vinílicos o similares"/>
						<v-radio value="3" label="Losetas, terrazas o similares"/>
						<v-radio value="4" label="Madera"/>
						<v-radio value="5" label="Cemento"/>
						<v-radio value="6" label="Tierra"/>
						<v-radio value="7" label="Otro material"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="3. EL MATERIAL PREDOMINANTE DE LOS TECHOS ES:">
					<v-radio-group v-model="o.p_3" >
						<v-radio value="1" label="Concreto armado"/>
						<v-radio value="2" label="Madera"/>
						<v-radio value="3" label="Teja"/>
						<v-radio value="4" label="Plancha de calamina, fibra de cemento o similares"/>
						<v-radio value="5" label="Caña o estera con torta de barro"/>
						<v-radio value="6" label="Estera"/>
						<v-radio value="7" label="Paja, hojas de palmera"/>
						<v-radio value="8" label="Otro material"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="4. EL MATERIAL PREDOMINANTE EN LAS PAREDES EXTERIORES ES:">
					<v-radio-group v-model="o.p_4" >
						<v-radio value="1" label="Ladrillo o bloque de cemento"/>
						<v-radio value="2" label="Piedra o sillar con cal o cemento"/>
						<v-radio value="3" label="Adobe"/>
						<v-radio value="4" label="Tapia"/>
						<v-radio value="5" label="Piedra con barro"/>
						<v-radio value="6" label="Madera"/>
						<v-radio value="7" label="Esteras"/>
						<v-radio value="8" label="Otro material"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="5. ¿CUÁNTAS HABITACIONES TIENE EN TOTAL LA VIVIENDA SIN CONTAR BAÑOS, PASADIZO, COCINA NI GARAJE?">
					<v-number v-model="o.p_5"/>
				</v-fieldset>
				<v-fieldset legend="6. ¿CUÁNTAS HABITACIONES SE USAN EXCLUSIVAMENTE PARA DORMIR?">
					<v-number v-model="o.p_6"/>
				</v-fieldset>
				<v-fieldset legend="7. EL BAÑO O SERVICIO HIGIÉNICO QUE TIENE SU HOGAR ESTÁ CONECTADO A:">
					<v-radio-group v-model="o.p_7" >
						<v-radio value="1" label="Red pública de desagüe dentro de la vivienda"/>
						<v-radio value="2" label="Red pública de desagüe fuera de la vivienda pero dentro de la edificación"/>
						<v-radio value="3" label="Letrina"/>
						<v-radio value="4" label="Pozo séptico"/>
						<v-radio value="5" label="Pozo ciego o negro"/>
						<v-radio value="6" label="Río, acequia o canal"/>
						<v-radio value="7" label="Otro"/>
						<v-radio value="8" label="No tiene"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="8. EL ABASTECIMIENTO DE AGUA EN SU HOGAR PROCEDE DE:">
					<v-radio-group v-model="o.p_8" >
						<v-radio value="1" label="Red pública dentro de la vivienda"/>
						<v-radio value="2" label="Red pública fuera de la vivienda pero dentro de la edificación"/>
						<v-radio value="3" label="Pilón de uso público"/>
						<v-radio value="4" label="Camión cisterna u otro similar"/>
						<v-radio value="5" label="Pozo"/>
						<v-radio value="6" label="Río, acequia, manantial o similar"/>
						<v-radio value="7" label="Otro"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset v-if="o.p_8&&o.p_8<4" legend="9. ¿EL AGUA QUE RECIBE ES POTABLE?">
					<v-radio-group v-model="o.p_9" >
						<v-radio value="1" label="Si"/>
						<div v-if="o.p_9==1" style="margin-bottom:20px;">
							<label>Horas al Día</label>
							<v-number v-model="o.p_9_1_1"/>
							<label>Días de la Semana</label>
							<v-number v-model="o.p_9_1_2"/>
						</div>
						<v-radio value="2" label="No"/>
						<div v-if="o.p_9==2" style="margin-bottom:20px;">
							<label>Horas al Día</label>
							<v-number v-model="o.p_9_1_1"/>
							<label>Días de la Semana</label>
							<v-number v-model="o.p_9_1_2"/>
						</div>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="10. EL ALUMBRADO DENTRO DE SU VIVIENDA ES:">
					<v-radio-group v-model="o.p_10" >
						<v-radio value="1" label="Electricidad"/>
						<v-radio value="2" label="Kerosene"/>
						<v-radio value="3" label="Petróleo/gas"/>
						<v-radio value="4" label="Generador"/>
						<v-radio value="5" label="Vela"/>
						<v-radio value="6" label="Otro"/>
					</v-radio-group>
				</v-fieldset>
			</template>
			<v-fieldset legend="11. SU HOGAR TIENE (seleccione más de una opción si aplica y especificar la cantidad) ">
				<table width="100%" class="table">
					<tr><td colspan="2"><label>Medios de comunicación para acceso remoto</label></td></tr>
					<tr><td>1. Televisores</td><td width="80"><v-number v-model="o.p_11_1"/></td></tr>
					<tr><td>2. Celulares con datos</td><td><v-number v-model="o.p_11_2"/></td></tr>
					<tr><td>3. Celulares sin datos</td><td><v-number v-model="o.p_11_3"/></td></tr>
					<tr><td>4. Computadoras</td><td><v-number v-model="o.p_11_4"/></td></tr>
					<tr><td>5. Laptop</td><td><v-number v-model="o.p_11_5"/></td></tr>
					<tr><td>6. Tablet</td><td><v-number v-model="o.p_11_6"/></td></tr>
					<tr><td colspan="2"><label>Artículos de cocina y limpieza</label></td></tr>
					<tr><td>7. Refrigeradora</td><td width="50"><v-number v-model="o.p_11_7"/></td></tr>
					<tr><td>8. Cocina a kerosene</td><td width="50"><v-number v-model="o.p_11_8"/></td></tr>
					<tr><td>9. Cocina a gas</td><td width="50"><v-number v-model="o.p_11_9"/></td></tr>
					<tr><td>10. Cocina eléctrica</td><td width="50"><v-number v-model="o.p_11_10"/></td></tr>
					<tr><td>11. Lavadora</td><td width="50"><v-number v-model="o.p_11_11"/></td></tr>
					<tr><td>12. Plancha</td><td width="50"><v-number v-model="o.p_11_12"/></td></tr>
					<tr><td colspan="2"><label>Artículos electrónicos</label></td></tr>
					<tr><td>13. Radio</td><td width="50"><v-number v-model="o.p_11_13"/></td></tr>
					<tr><td>14. DVD</td><td width="50"><v-number v-model="o.p_11_14"/></td></tr>
					<tr><td>15. Videograbadora</td><td width="50"><v-number v-model="o.p_11_15"/></td></tr>
					<tr><td>16. Máquina de coser</td><td width="50"><v-number v-model="o.p_11_16"/></td></tr>
					
					<tr><td colspan="2"><label>Vehículos</label></td></tr>
					<tr><td>17. Triciclo</td><td width="50"><v-number v-model="o.p_11_17"/></td></tr>
					<tr><td>18. Auto</td><td width="50"><v-number v-model="o.p_11_18"/></td></tr>
					<tr><td>19. Camioneta</td><td width="50"><v-number v-model="o.p_11_19"/></td></tr>
					<tr><td>20. Motocicleta</td><td width="50"><v-number v-model="o.p_11_20"/></td></tr>
					<tr><td>21. Mototaxi</td><td width="50"><v-number v-model="o.p_11_21"/></td></tr>
					<tr><td>22. Camión</td><td width="50"><v-number v-model="o.p_11_22"/></td></tr>					
				</table>
			</v-fieldset>
		</v-form>
	</ion-content>
</template>
<script>
import {IonContent} from '@ionic/vue';
var axios=window.axios;
export default window._.ui({
	components:{IonContent},
	props:['id'],
	data(){return{o:{id:null,synchronized:null},count:0}},
	created(){
		var me=this;
		if(me.id<0){
			me.getStoredList('poll').then((poll)=>{
				poll.forEach(e =>{
					if(e.tmpId==Math.abs(me.id)){
						me.o=e;me.kk++;
					}
				});
			});
		}else if(me.id)
			axios.get('/api/poll/'+me.id,{params:{poll:me.app.poll}}).then((d)=>{
				me.o=d.data;
			});
	},
	methods:{
		close(o){
			if(o.id)this.o.id=o.id;
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