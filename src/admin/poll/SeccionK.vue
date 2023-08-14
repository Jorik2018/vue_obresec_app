<template>
	<ion-content :scroll-events="true">
		<v-form style="padding:10px;" class="v-form" 
			:class="o.id<0||(o.tmpId&&!o.synchronized)?'yellow':(o.tmpId?'green':'')" 
			store="poll" action="/api/poll">
					<span class="v-button-top-float" v-on:click="save"><i class="fa fa-save"></i></span>	
			<h2 
			style="margin-right: 50px;padding-left: 34px;margin-bottom:20px;position: relative;font-size: 24px;background-color: transparent;">
			<i class="fa fa-shuttle-van" style="position: absolute; left: 2px; top: 3px;"></i>
			SECCIÓN J: REDES SOCIALES Y MOVILIDAD EN EL TERRITORIO</h2>
			<div :class="o.id<0?'yellow':''">ID={{o.id}}</div>
			<v-fieldset legend="97. APROXIMADAMENTE, CUÁNTO TIEMPO TARDA EN LLEGAR A LA CAPITAL DE DISTRITO UTILIZANDO UN VEHÍCULO DE TRANSPORTE PÚBLICO?">
				<label>Horas</label>
				<v-number v-model="o.p_97_1"/>
				<label>Minutos</label>
				<v-number v-model="o.p_97_2"/>
			</v-fieldset>
			<v-fieldset legend="98. ¿CUÁLES SON LAS TRES ACTIVIDADES DE MAYOR IMPORTANCIA POR LAS QUE SE MOVILIZA HACIA LA CAPITAL DISTRITAL? (Elija máximo tres)">
					<v-checkbox v-model="o.p_98_1" v-on:input="changeP98(o)" label="Venta de productos en el mercado local"/>
					<v-checkbox v-model="o.p_98_2" v-on:input="changeP98(o)" label="Compra de alimentos e insumos"/>
					<v-checkbox v-model="o.p_98_3" v-on:input="changeP98(o)" label="Realizar trámites diversos"/>
					<v-checkbox v-model="o.p_98_4" v-on:input="changeP98(o)" label="Visitar a parientes"/>
					<v-checkbox v-model="o.p_98_5" v-on:input="changeP98(o)" label="Atención en salud"/>
					<v-checkbox v-model="o.p_98_6" v-on:input="changeP98(o)" label="Otro"/>
					<div v-if="o.p_98_6&&o.p_98_6!=0">
						<label>(Especifique)</label>
						<input v-model="o.p_98_6_1"/>
					</div>
					<v-checkbox v-model="o.p_98_7" v-on:input="changeP98(o)" label="No voy a la capital distrital
(Aplica si no se obtiene respuesta para algunas de las alternativas previamente señaladas)"/>
			
			</v-fieldset>
			<v-fieldset legend="99. ¿USTED O ALGÚN MIEMBRO DE SU HOGAR PERMANECE POR TEMPORADAS EN OTROS LUGARES DENTRO DE LA PROVINCIA POR RAZONES DE TRABAJO?">
				<v-radio-group v-model="o.p_99" >
					<v-radio value="1" label="Si"/>
					<div v-if="o.p_99==1" style="margin-bottom:20px;">
						<label>Lugar</label>
						<input v-model="o.p_99_1"/>
						<label>Período de permanencia (marcar una opción):</label>
						<v-select v-model="o.p_99_2" >
							<option value="0">--SELECCIONAR--</option>
							<option v-for="(value,key) in options.frequency2" :key="'p_99_2_'+key" :value="key+1">{{value}}</option>
						</v-select>
					</div>
					<v-radio value="2" label="No"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset legend="100. ¿USTED O ALGÚN MIEMBRO DE SU HOGAR PERMANECE POR TEMPORADAS EN OTROS LUGARES FUERA DE LA PROVINCIA POR RAZONES DE TRABAJO?">
				<v-radio-group v-model="o.p_100" >
					<v-radio value="1" label="Si"/>
					<div v-if="o.p_100==1" style="margin-bottom:20px;">
						<label>Lugar</label>
						<input v-model="o.p_100_1"/>
						<label>Período de permanencia (marcar una opción):</label>
						<v-select v-model="o.p_100_2" >
							<option value="0">--SELECCIONAR--</option>
							<option v-for="(value,key) in options.frequency2" :key="'p_101_2_'+key" :value="key+1">{{value}}</option>
						</v-select>
					</div>
					<v-radio value="2" label="No"/>
				</v-radio-group>
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
	data(){
		return{o:{p_101_2:null},options:{
			frequency:['Semanal','Quincenal','Mensual','Anual'],
			frequency2:['Un mes','De uno a tres meses','Más de tres meses']
		}}
	},
	created(){
		var me=this;
		if(me.id<0){
			me.getStoredList('poll').then((poll)=>{
				poll.forEach(e =>{
					if(e.tmpId==Math.abs(me.id)){me.o=e;}
				});
			});
		}else if(me.id)
			axios.get('/api/poll/'+me.id,{params:{poll:me.app.poll}}).then((d)=>{
				me.o=d.data;
			});
	},
	methods:{
		changeP98(o){
			console.log([o.p_98_1,o.p_98_2,o.p_98_3,o.p_98_4,o.p_98_5]);
		},
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