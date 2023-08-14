<template>
	<ion-content :scroll-events="true">
		<v-form style="padding:10px;" class="v-form" :class="o.id<0||(o.tmpId&&!o.synchronized)?'yellow':(o.tmpId?'green':'')" store="poll" action="/api/poll">
			<span class="v-button-top-float" v-on:click="save"><i class="fa fa-save"></i></span>	
			<h2 
			style="padding-left: 34px;margin-bottom:20px;position: relative;font-size: 24px;background-color: transparent;">
			<i class="fa fa-users" style="position: absolute; left: 2px; top: 3px;"></i>
			SECCIÓN D: CARACTERÍSTICAS SOCIODEMOGRÁFICAS II (Responde solo el jefe de hogar)</h2>
			<div :class="o.id<0?'yellow':''">ID={{o.id}}</div>
			<v-fieldset legend="30. ¿EN QUÉ DEPARTAMENTO, PROVINCIA Y DISTRITO NACIÓ USTED? (completar con código de ubigeo)">
				<label>Departamento:</label>
				<v-select v-model="o.p_30_1"
					@input="$refs.province.load({code:pad(o.p_30_1,2)})">
					<option value="">Seleccionar Opci&oacute;n</option>
					<v-options store="region" display-field="name" value-field="id"/>
				</v-select>
				<label>Provincia:</label>
				<v-select autoload="false" storage="province" ref="province"
					:disabled="!o.p_30_1" v-model="o.p_30_2" 
					@input="$refs.district.load({code:o.p_30_2})">
					<option value="">Seleccionar Opci&oacute;n</option>
					<v-options store="province" value-field="code" display-field="name"/>
				</v-select>
				<label>Distrito:</label>
				<v-select ref="district"
					autoload="false" :disabled="!o.p_30_2" v-model="o.p_30_3" >
					<option value="">Seleccionar Opci&oacute;n</option>
					<v-options store="district" value-field="code" display-field="name"/> 
				</v-select>
			</v-fieldset>
			<v-fieldset legend="31. SIN TENER EN CUENTA EL LUGAR DONDE NACIÓ, ¿HA VIVIDO USTED EN OTRO LUGAR EN LOS ÚLTIMOS 5 AÑOS?">
				<v-radio-group v-model="o.p_31" >
					<v-radio value="1" label="Sí, dentro del Perú [Pase a P31]"/>
					<v-radio value="2" label="Sí, fuera del Perú [Pase a P31]"/>
					<v-radio value="3" label="No [Pase a P32]"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset v-if="o.p_31&&o.p_31<3" legend="32. CUÁL FUE EL ÚLTIMO DISTRITO DÓNDE USTED VIVIÓ ANTES DE SU ACTUAL RESIDENCIA? (completar con código de ubigeo, salvo en la alternativa 4. De aplicarse esta alternativa, escribir solo el nombre del país)">
				<template v-if="o.p_31==1">
					<label>Departamento:</label>
					<v-select v-model="o.p_32_1" 
						@input="$refs.province2.load({code:pad(o.p_32_1,2)})">
						<option value="">Seleccionar Opci&oacute;n</option>
						<v-options store="region" display-field="name" value-field="id"/>
					</v-select>
					<label>Provincia:</label>
					<v-select ref="province2" autoload="false"
						:disabled="!o.p_32_1" v-model="o.p_32_2" 
						@input="$refs.district2.load({code:o.p_32_2})">
						<option value="">Seleccionar Opci&oacute;n</option>
						<v-options store="province" value-field="code" display-field="name"/>
					</v-select>
					<label>Distrito:</label>
					<v-select ref="district2"
						autoload="false" :disabled="!o.p_32_2" v-model="o.p_32_3" >
						<option value="">Seleccionar Opci&oacute;n</option>
						<v-options store="district" value-field="code" display-field="name"/> 
					</v-select>
				</template>
				<template v-if="o.p_31==2">
					<label>Extranjero:</label>
					<input v-model="o.p_32_4" placeholder="Nombre del pais" maxlength="50"/>
				</template>
			</v-fieldset>
			<v-fieldset legend="33. ¿CUÁNTOS MIEMBROS (INCLUYENDO USTED) COLABORAN CON LA MANUTENCIÓN DEL HOGAR?">
				<v-number v-model="o.p_33"/>
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
		return{
			regionList_1:[],provinceList_1:[],districtList_1:[],
			regionList_2:[],provinceList_2:[],districtList_2:[],o:{
				id:null,synchronized:null,
				p_30_1:null,p_30_2:null,p_30_3:null,p_32_1:null,p_32_2:null,p_32_3:null,ext:{}}
		}
	},
	mounted(){
		console.log('mounted c');
	},
	created(){
		var me=this;
		if(me.id<0){
			me.getStoredList('poll').then((poll)=>{
				poll.forEach(e =>{
					if(e.tmpId==Math.abs(me.id)){me.o=e;me.kk++;}
				});
			});
		}else if(me.id)
			axios.get('/api/poll/'+me.id,{params:{poll:me.app.poll}}).then((d)=>{
				var o=d.data;
				if(o.p_30_2)o.p_30_2=me.pad(o.p_30_2,4);
				if(o.p_30_3)o.p_30_3=me.pad(o.p_30_3,6);
				if(o.p_32_2)o.p_32_2=me.pad(o.p_32_2,4);
				if(o.p_32_3)o.p_32_3=me.pad(o.p_32_3,6);
				me.o=o;
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