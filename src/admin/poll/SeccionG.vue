<template>
	<ion-content :scroll-events="true">
		<v-form style="padding:10px;" class="v-form" :class="o.id<0||(o.tmpId&&!o.synchronized)?'yellow':(o.tmpId?'green':'')" 
		store="poll" action="/api/poll">
			<span class="v-button-top-float" v-on:click="save"><i class="fa fa-save"></i></span>
			<h2 
			style="margin-right: 50px;padding-left: 34px;margin-bottom:20px;position: relative;font-size: 24px;background-color: transparent;">
			<i class="fa fa-briefcase" style="position: absolute; left: 2px; top: 3px;"></i>
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
import {IonContent} from '@ionic/vue';
export default window._.ui({
	components:{IonContent},
	props:['id'],
	data(){return{o:{id:null,synchronized:null}}},
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