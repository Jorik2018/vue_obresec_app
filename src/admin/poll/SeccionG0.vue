<template>
	<ion-content :scroll-events="true">
		<v-form style="padding:10px;" class="v-form" :class="o.id<0||(o.tmpId&&!o.synchronized)?'yellow':(o.tmpId?'green':'')" 
		store="poll" action="/api/poll">
			<span class="v-button-top-float" v-on:click="save"><i class="fa fa-save"></i></span>
			<h2 
			style="margin-right: 50px;padding-left: 34px;margin-bottom:20px;position: relative;font-size: 24px;background-color: transparent;">
			<i class="fa fa-briefcase" style="position: absolute; left: 2px; top: 3px;"></i>
			SECCIÓN G: DEMANDA DE EMPLEO</h2>
			<div :class="o.id<0?'yellow':''">ID={{o.id}}</div>
			<v-fieldset legend="67. ¿USTED O ALGÚN MIEMBRO DE SU HOGAR TIENEN UN NEGOCIO Y/O ACTIVIDAD QUE IMPLIQUE CONTRATAR TRABAJADORES?">
				<v-radio-group v-model="o.p_67" >
					<v-radio value="1" label="Si"/>
					<v-radio value="2" label="No [Fin de sección]"/>
				</v-radio-group>
			</v-fieldset>
			<template v-if="o.p_67==1">
				<v-fieldset legend="68. ¿A QUÉ SECTOR PERTENECE SU NEGOCIO Y/O ACTIVIDAD PRODUCTIVA?">
					<v-radio-group v-model="o.p_68" >
						<v-radio value="1" label="Agrícola"/>
						<v-radio value="2" label="Pecuario"/>
						<v-radio value="3" label="Pesca"/>
						<v-radio value="4" label="Minería"/>
						<v-radio value="5" label="Manufactura"/>
						<v-radio value="6" label="Construcción"/>
						<v-radio value="7" label="Comercio"/>
						<v-radio value="8" label="Transportes y comunicaciones"/>
						<v-radio value="9" label="Servicios"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="69. ¿QUÉ EFECTO TUVO EL COVID-19 EN SUS INGRESOS DURANTE EL AÑO 2020?">
					<v-radio-group v-model="o.p_69" >
						<v-radio value="1" label="Disminuyeron más del 50%"/>
						<v-radio value="2" label="Disminuyeron entre el 25% y 50%"/>
						<v-radio value="3" label="Disminuyeron hasta el 25%"/>
						<v-radio value="4" label="El negocio recién empezó durante la pandemia"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="70. ¿CUÁNTOS TRABAJADORES EMPLEA SU NEGOCIO Y/O ACTIVIDAD PRODUCTIVA">
					<div style="width:300px;overflow-x:auto">
					<table width="500" class="jtable table center">
						<tr><td colspan="2">Antes de Marzo 2020</td><td colspan="2">En la actualidad</td></tr>
						<tr><td>Permanentes</td><td>Estacionales</td><td>Permanentes</td><td>Estacionales</td></tr>
						<tr class="bold"><td colspan="4">Entre 1 y 10</td></tr>
						<tr><td><v-number v-model="o.p_70_1_1"/></td><td><v-number v-model="o.p_70_1_2"/></td><td><v-number v-model="o.p_70_1_3"/></td><td><v-number v-model="o.p_70_1_4"/></td></tr>
						<tr class="bold"><td colspan="4">Entre 11 y 20</td></tr>
						<tr><td><v-number v-model="o.p_70_2_1"/></td><td><v-number v-model="o.p_70_2_2"/></td><td><v-number v-model="o.p_70_2_3"/></td><td><v-number v-model="o.p_70_2_4"/></td></tr>
						<tr class="bold"><td colspan="4">Entre 21 y 50</td></tr>
						<tr><td><v-number v-model="o.p_70_3_1"/></td><td><v-number v-model="o.p_70_3_2"/></td><td><v-number v-model="o.p_70_3_3"/></td><td><v-number v-model="o.p_70_3_4"/></td></tr>
						<tr class="bold"><td colspan="4">Más de 50</td></tr>
						<tr><td><v-number v-model="o.p_70_4_1"/></td><td><v-number v-model="o.p_70_4_2"/></td><td><v-number v-model="o.p_70_4_3"/></td><td><v-number v-model="o.p_70_4_4"/></td></tr>
					</table>
					</div>
				</v-fieldset>
				<v-fieldset legend="71. ¿CÓMO DESCRIBIRÍA LAS ACTIVIDADES DE SU NEGOCIO Y/O ACTIVIDAD PRODUCTIVA EN LA ACTUALIDAD?">
					<v-radio-group v-model="o.p_71" >
						<v-radio value="1" label="Operación a pleno en modalidad presencial"/>
						<v-radio value="2" label="Operación a pleno con los trabajadores laborando desde casa"/>
						<v-radio value="3" label="Operación mixta (presencial junto a trabajo en casa)"/>
						<v-radio value="4" label="No se han reanudado operaciones"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="72. ¿CUÁLES SON LOS PRINCIPALES PROBLEMAS A LOS QUE SE ENFRENTA SU EMPRESA COMO CONSECUENCIA DEL COVID-19?">
					<v-checkbox v-model="o.p_72_1" label="Insuficientes ingresos para mantener al personal"/>
					<v-checkbox v-model="o.p_72_2" label="Trabajadores no laboran por enfermedad"/>
					<v-checkbox v-model="o.p_72_3" label="Suministro limitado de materias primas"/>
					<v-checkbox v-model="o.p_72_4" label="Demanda de clientes es menor a la usual"/>
					<v-checkbox v-model="o.p_72_5" label="Clientes no pagan a tiempo"/>
				</v-fieldset>
				<v-fieldset legend="73. COMO EMPLEADOR, EN ESTE MOMENTO TIENE MAYOR DISPOSICIÓN A:">
					<v-radio-group v-model="o.p_73" >
						<v-radio value="1" label="Aumentar el número de trabajadores con contratos permanentes"/>
						<v-radio value="2" label="Aumentar el número de trabajadores con contratos temporales"/>
						<v-radio value="3" label="Conservar el número de trabajadores que actualmente lo acompañan"/>
						<v-radio value="4" label="Reducir el número de trabajadores con contratos permanentes"/>
						<v-radio value="5" label="Reducir el número de trabajadores con contratos temporales"/>
					</v-radio-group>
				</v-fieldset>
			</template>
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