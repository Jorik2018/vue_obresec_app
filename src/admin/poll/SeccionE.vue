<template>
	<ion-content :scroll-events="true">
		<v-form style="padding:10px;" class="v-form" store="people" 
			:class="o.id<0||(o.tmpId&&!o.synchronized)?'yellow':(o.tmpId?'green':'')" 
			action="/api/poll/people">
			<span class="v-button-top-float" v-on:click="save"><i class="fa fa-save"></i></span>	
			<h2>
			<i class="fa fa-book" style="position: absolute; left: 2px; top: 3px;"></i>
			SECCIÓN D: MÓDULO DE EDUCACIÓN (A partir  de P35 Aplica a quienes respondieron si en P19 y P40 aplica para todos los encuestados)</h2>
			<div :class="o.id<0?'yellow':''">ENCUESTA={{o.encuesta_id}} > ID={{o.id}}</div>
			
				<v-fieldset legend="34. ¿CUÁL ES EL GRADO O AÑO DE ESTUDIOS AL QUE ASISTIÓ EL AÑO 2020? (Completar)">
					<table width="100%" class="jtable table">
						<tr>
						<td></td><td>Año o grado cursado</td></tr>
						<tr><td>Inicial</td><td width="80"><v-number v-model="o.p_34_1"/></td></tr>
						<tr><td>Primaria</td><td><v-number v-model="o.p_34_2"/></td></tr>
						<tr><td>Secundaria</td><td><v-number v-model="o.p_34_3"/></td></tr>
						<tr><td>Básica especial</td><td><v-number v-model="o.p_34_4"/></td></tr>
						<tr><td>Sup técnica o artística</td><td><v-number v-model="o.p_34_5"/></td></tr>
						<tr><td>Sup. universitaria</td><td><v-number v-model="o.p_34_6"/></td></tr>
						<tr><td>Maestría o doctoral</td><td><v-number v-model="o.p_34_7"/></td></tr>
					</table>
				</v-fieldset>
				<template v-if="o.p_19==1">
				<v-fieldset legend="35. ¿TUVO QUE COMPARTIR EQUIPOS ELECTRÓNICOS  CON OTROS MIEMBROS DE SU HOGAR PARA ACCEDER A SUS CLASES A DISTANCIA DURANTE EL AÑO 2020?">
					<v-radio-group v-model="o.p_35">
						<v-radio value="1" label="Si"/>
						<v-radio value="2" label="No"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="36. ¿CON QUÉ FRECUENCIA ASISTIÓ A LAS CLASES VIRTUALES DURANTE EL AÑO 2020?">
					<v-radio-group v-model="o.p_36">
						<v-radio value="1" label="Asistí a la mayoría de clases virtuales"/>
						<v-radio value="2" label="Asistí a muy pocas clases virtuales"/>
						<v-radio value="3" label="No asistí a las clases virtuales"/>
					</v-radio-group>
				</v-fieldset>
			</template>
			<v-fieldset legend="37. EL AÑO 2021 ESTÁ MATRICULADO EN ALGÚN PROGRAMA DE EDUCACIÓN BÁSICA O SUPERIOR:">
				<v-radio-group v-model="o.p_37">
					<v-radio value="1" label="Sí - Pasa a P39 (responde ambas columnas)"/>
					<v-radio value="2" label="No - Pasa a P39 (responde solo la primera columna y no aplica a la segunda)"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset legend="38. ¿A TRAVÉS DE QUÉ MEDIOS ACCEDIÓ A LA EDUCACIÓN DURANTE LOS AÑOS 2020 Y 2021?">
				<table width="100%" class="jtable table">
					<tr>
					<td width="50%">2020 (aplica para todos los que responden el módulo)</td>
					<td><div v-if="o.p_37==1">2021 (aplica para quien respondió positivamente en  P37)</div></td></tr>
					<tr><td colspan="2">1. Televisión</td></tr>
					<tr class="center"><td><v-checkbox v-model="o.p_38_1_1"/></td><td width="80"><v-checkbox v-if="o.p_37==1" v-model="o.p_38_1_2"/></td></tr>
					<tr><td colspan="2">2. Radio o equipo de sonido</td></tr>
					<tr class="center"><td><v-checkbox v-model="o.p_38_2_1"/></td><td><v-checkbox v-if="o.p_37==1" v-model="o.p_38_2_2"/></td></tr>
					<tr><td colspan="2">3. Plataforma virtual en computadora</td></tr>
					<tr class="center"><td><v-checkbox v-model="o.p_38_3_1"/></td><td><v-checkbox v-if="o.p_37==1" v-model="o.p_38_3_2"/></td></tr>
					<tr><td colspan="2">4. Plataforma virtual en tablet</td></tr>
					<tr class="center"><td><v-checkbox v-model="o.p_38_4_1"/></td><td><v-checkbox v-if="o.p_37==1" v-model="o.p_38_4_2"/></td></tr>
					<tr><td colspan="2">5. Plataforma virtual en celular</td></tr>
					<tr class="center"><td><v-checkbox v-model="o.p_38_5_1"/></td><td><v-checkbox v-if="o.p_37==1" v-model="o.p_38_5_2"/></td></tr>
					<tr><td colspan="2">6. Se retomaron clases presenciales</td></tr>
					<tr class="center"><td><v-checkbox v-model="o.p_38_6_1"/></td><td><v-checkbox v-if="o.p_37==1" v-model="o.p_38_6_2"/></td></tr>
					<tr><td colspan="2">7. No aplica</td></tr>
					<tr class="center"><td><v-checkbox v-model="o.p_38_7_1"/></td><td><v-checkbox v-if="o.p_37==1" v-model="o.p_38_7_2"/></td></tr>
				</table>
			</v-fieldset>
		
			<v-fieldset v-if="o.p_19==2" legend="39. CUÁL ES LA PRINCIPAL RAZÓN POR LA QUE NO ESTÁ MATRICULADO O NO ASISTE A ALGÚN CENTRO O PROGRAMA DE EDUCACIÓN BÁSICA O SUPERIOR?">
				<v-radio-group v-model="o.p_39" >
					<v-radio value="1" label="Problemas económicos"/>
					<v-radio value="2" label="Estoy trabajando"/>
					<v-radio value="3" label="Termino estudios sus estudios secundarios o superiores y/o asiste a academia preuniversitaria"/>
					<v-radio value="4" label="No tiene edad suficiente (cinco años o menos)"/>
					<v-radio value="5" label="Problemas suficientes"/>
					<v-radio value="6" label="De vacaciones"/>
					<v-radio value="7" label="No existe centro de educación básica o superior en el centro poblado"/>
					<v-radio value="8" label="Asiste a un centro de Educación Técnico Productiva"/>
					<v-radio value="9" label="No me interesa/no me gusta el estudio"/>
					<v-radio value="10" label="Se dedica a otros quehaceres del hogar"/>
					<v-radio value="11" label="Otros motivos"/>
				</v-radio-group>
			</v-fieldset>
		</v-form>
	</ion-content>
</template>
<script>
import {IonContent} from '@ionic/vue';
export default window._.ui({
	components:{IonContent},
	props:['id','parent'],
	data(){return{o:{}}},
	created(){
		var me=this;
		me.$on('stored',(o,data)=>{
			me.getStoredList('poll').then((polls)=>{
				polls.forEach(e =>{
					if(o.masterId<0&&e.tmpId==Math.abs(o.encuesta_id)||e.id==o.encuesta_id){
						delete e.synchronized;
						e.people=data;
						window._.db.transaction(['poll'], "readwrite").objectStore('poll').put(e);
					}
				});
			});
		});
	},
	mounted(){this.changeRoute();},
	methods:{
		changeRoute(){
			var me=this,id=me.id;
			me.o.encuesta_id=me.parent;
			//es un registro temporal
			if(id<0){
				var item=window._.db.transaction(["people"], "readwrite").objectStore("people").get(-id);
				item.onsuccess = function() {
					if(item.result){
						me.o=item.result;
					}
				};
			}else if(id){
				window.axios.get('/api/poll/people/'+id,{params:{poll:me.app.poll}}).then((d)=>{
					me.o=d.data;
				});
			}else if(me.o.encuesta_id<0){
				//Si el padre es temporal se indica que el registro sera temporal
				me.o.tmpId=+new Date();
			}
		},
		process(o){
			o.poll=this.app.poll;
			return o;
		},
		close(o){
			if(o.data.id)this.o.id=o.data.id;
		},
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
	.table .v-checkbox{
		display:inline-block !important;
		
	}
	.table .v-checkbox > span{
		display:inline-block !important;
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