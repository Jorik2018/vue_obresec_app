<template>
	<ion-content :scroll-events="true">
		<v-form style="padding:10px;height:100%" class="v-form" 
		:class="o.id<0||(o.tmpId&&!o.synchronized)?'yellow':(o.tmpId?'green':'')">
			<h2>
			<i class="fa fa-home" style="position: absolute; left: 2px; top: 3px;"></i>
			<b>SECCIÓN B: CARACTERÍSTICAS SOCIODEMOGRÁFICAS I</b>
          [Idealmente responden todos los miembros del hogar mayores de 12 años y
           para aquellos por debajo de dicho rango etario, el jefe/a brinda la información
            requerida. No obstante, de no poder cumplirse tal condición, el/la jefe/a puede
             brindar información por todos los demás miembros del hogar] - 
             <b>SECCIÓN C: FUENTES DE INGRESO</b> [Debe ser respondida por todo miembro del hogar mayor de 14 años de edad ]</h2>
		<div :class="o.id<0?'yellow':''"><a class="v-link" :href="'/admin/poll/'+o.id">ID={{o.id}}</a></div>
		<v-table ref="t" store="people" 
		v-on:row-select="rss"
		autoload="false" :value="o.people" 
			row-style-class="row.synchronized?'green':(row.tmpId>0?'yellow':'')" src="/api/poll/people/0/0"
			:filters="filters" v-on:updated="app.bindLinks($el)">
			<template v-slot:default="{row}"> 
				<td header="ID" width="80" class="center">{{pad(row.id,4)}}</td>
				<td header="Nombre Completo"><a :href="'/admin/poll/'+row.encuesta_id+'/people/'+(row.tmpId?(-row.tmpId):row.id)">{{row.fullName?row.fullName:'empty'}}</a></td> 
				<td header="Edad" width="80" class="center"> {{row.p_14}} </td> 
			</template> 
		</v-table>
		<div class="right">
			<v-button @click="$refs.t.load()" icon="fa-sync"/>
		</div>
		<span class="v-cart" v-show="rowSelectedCount2" 
		v-on:click="destroy" 
		style="display:inline-block;background-color:red;color:white;position:abolute;bottom:100px;right:10px;float:right;">
			<span><i class="fa fa-trash"></i></span>
		</span>
		<a :href="'/admin/poll/'+id+'/people'" class="v-cart" style="display:inline-block;color:white;bottom:10px;right:10px;float:right;">
			<span><i class="fa fa-plus"></i></span>
		</a>
		</v-form>
	</ion-content>
</template>
<script>
import {IonContent} from '@ionic/vue';
export default window._.ui({
	components:{IonContent},
	props:['id'],
	data(){return {rowSelectedCount2:0,k:0,o:{id:null,people:[]}}},
	created(){
		var me=this;
		me.$on('destroyed',(peoples)=>{
			var me=this;
			me.getStoredList('poll').then((poll)=>{
				var db=window._.db,objectStore =db.transaction(['poll'], "readwrite").objectStore('poll');
				poll.forEach(e =>{
					if(Math.abs(e.id)==Math.abs(peoples[0].encuesta_id)){
						//Se graban todos las personas en la encuesta seleccionada
						if(e.people){
							peoples.forEach(p =>{
								e.people = e.people.filter(function(v){ 
									return Math.abs(v.id)!=Math.abs(p.id);
								});
							});
							objectStore.put(e);
						}
					}
				});
			});
		});
	},
	mounted(){this.changeRoute();},
	methods:{
		rss(e){
			e=e.selection;
			this.rowSelectedCount2=e?e.length:0;
		},
		async changeRoute(){
			var me=this;
			me.filters.encuesta_id=me.id;
			me.filters.poll=me.app.poll;
			if(me.id<0){
				me.getStoredList('poll').then((poll)=>{
					poll.forEach(e =>{
						if(e.tmpId==Math.abs(me.id)){
							me.o=e;
							me.trayLocation=e.lat&&e.lon;
							me.setStoredList('people',me.o.people);
							me.$refs.t.load();
						}
					});
				});
			}else if(me.id>0){
				me.filters.encuesta_id=me.id;
				var loaded=0;
				me.getStoredList('poll').then((poll)=>{
					poll.forEach(e =>{
						if(e.id==me.id){
							me.o=e;
							me.setStoredList('people',me.o.people);
							me.$refs.t.load();
							loaded=1;
						}
					});
				});
				if(me.app.connected)
					window.axios.get('/api/poll/' + me.id,{params:{poll:me.app.poll}}).then(function (response) {
						me.o = response.data;
						if(!loaded)me.$refs.t.load();
					});
				
				
			}
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