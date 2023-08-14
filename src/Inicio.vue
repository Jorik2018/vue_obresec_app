<template>
	<ion-content :scroll-events="true">
		<a href="/shami/poll" style="display: block;
    height: -webkit-fill-available;">
		<img src="@/cdn/images/logo.jpeg" width="100%" height="100%" style="display:none;object-fit: contain;"/>
		</a>
	</ion-content>
</template>
<script>
import {IonContent} from '@ionic/vue';
export default window._.ui({
	components:{IonContent},
	props:['id','parent'],
	data(){return{o:{ext:{}}}},
	created(){
		var me=this;
		me.$on('storage',me.storage);
		me.o.encuesta_id=me.parent;
		if(me.id<0){
			var poll=JSON.parse(localStorage.getItem('poll'));
			poll.forEach(e =>{if(e.id==me.id)return (me.o=e);});
		}else if(me.id)
			window.axios.get('/api/poll/people/'+me.id).then((d)=>{
				me.o=d.data;
			});
	},
	methods:{
		storage(o){
			var me=this,poll=JSON.parse(localStorage.getItem('poll'));
			if(poll)
				//Se busca entre los registros la encuesta del registro actual
				poll.forEach(e =>{if(e.id==me.parent){
					e.people=o;
					localStorage.setItem('poll',JSON.stringify(poll));
				}});
		},
		close2(o){
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