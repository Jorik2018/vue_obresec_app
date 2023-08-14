<template>
	<v-form v-bind:header="app.title" style="position:relative;-padding: 10px;height:100%;">
		<div style="padding:15px" class="v-form view-list">
			<v-dataview ref="dataview" src="/admin/commerce/api/notification" v-bind:filters="filter" v-on:updated="app.bindLinks($el)" 
				pagination="10" row-style-class="order">
				<template v-slot="{row}">
					<a v-bind:href="row.href">{{row.body}}</a>
				</template>
			</v-dataview>
		</div>
	</v-form>
</template>
<script>
export default window.ui({
	methods:{
		attend(o){
			this.$router.push('/admin/order/'+o.id+'/attend');
		},
		change(){
			var me=this;
			setTimeout(function(){ me.$refs.dataview.load(true) }, 500);
		}
	},
	created(){
		window.app.title='Notificaciones';
		this.option=1;
	},
	mounted(){
		this.app.notification.length = 0;
	},
	computed:{
		filter(){
			var p={},me=this;
			p.user=me.app.session.idUsuario;
			console.log(p);
			return p;
		}
	},
	data(){return {data:[],option:0}}
});
</script>
<style scope>
	.icons > * > i,.icons > * > svg{
		width:32px !important;
		margin-right:10px;
		float:left;
		font-size:24px;
		width:42px;
		height:42px;
	}
	.order > div > span{
		position: absolute;
		right: 0px;
		background-color: #eda514;
		border-radius: 5px;
		padding: 2px 10px;
	}
	.order{
		border: 1px solid gray;
		padding: 10px;
		border-radius: 10px;
		width: -webkit-fill-available;
		width: fill-available;
		background-color:white;
	}
	.order > div{
		position:relative;
		
	}
	.order label{
		margin-right:5px;
		
	}
	.order i + div,.order svg + div{
		display:inline-block;
		width:calc(100% - 50px);
	}
	.controls a:not(:last-child){
		display:inline-block;
		margin-right:10px;
	}
	.alert{
		padding: 20px;
		background-color: #fff7a8;
		font-size: 20px;
		border: 1px solid #ffca69;
		border-radius: 5px;
		color:black;
	}
	.v-no-results {
		color: rgb(43 87 181) !important;
		background: white !important;
	}
</style>