<template>
	<ion-content :scroll-events="true">
		<v-form style="padding:10px;" :class="o.id<0||(o.tmpId&&!o.synchronized)?'yellow':(o.tmpId?'green':'')" 
			class="v-form">
			<h2>
				<i class="fa fa-book" style="position: absolute; left: 2px; top: 3px;"></i>
				SECCIÓN E: MÓDULO DE EDUCACIÓN [Idealmente debe ser respondida por todos los miembros del hogar mayores de 12 años matriculados en la educación básica o superior y/o por el jefe/a de hogar para los miembros del hogar menores de 12 años. De no ser así, la información puede ser provista solamente por el/la jefe/a de hogar]
			</h2>
			<div :class="o.id<0?'yellow':''">ID={{o.id}}</div>
			<v-table ref="t" store="people" autoload="false" :value="o.people" 
			row-style-class="row.synchronized?'green':(row.tmpId>0?'yellow':'')" src="/api/poll/people/0/0" :filters="filters" v-on:updated="app.bindLinks($el)">
				<template v-slot:default="{row}">
					<td header="ID" width="80" class="center">{{pad(row.id,4)}}</td>
					<td header="Nombre Completo"><a :href="'/admin/poll/'+row.encuesta_id+'/e/'+(row.tmpId?(-row.tmpId):row.id)">{{row.fullName?row.fullName:'empty'}}</a></td> 
					<td header="Edad" width="80" class="center"> {{row.p_14}} </td> 
				</template> 
			</v-table>
		</v-form>
	</ion-content>
</template>
<script>
import {IonContent} from '@ionic/vue';
export default window._.ui({
	components:{IonContent},
	props:['id'],
	data(){return {o:{id:null}}},
	updated(){
		window.app.bindLinks(this.$el);
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
				me.o={id:me.id,people:[]};
				me.$refs.t.load();
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