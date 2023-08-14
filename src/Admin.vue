<template>
<div><AppMenu></AppMenu>
			<ion-router-outlet id="main"></ion-router-outlet>
			<ion-page>

	<!--<div class="v-main" id="app">-->
		<ion-header id="header-categoria">
			
			<!--<div id="page-header">-->
			<div class="primary center" style="padding-top: 3px;padding-bottom: 7px;">
				<span  v-on:click="$router.go(-1)" style="position: absolute;left: 0px;padding: 5px 13px;display: inline-block; margin-top: 10px;font-size: 15px;">
					<i class="fa fa-arrow-left"></i>
				</span>
				<span v-on:click="toggleMenu" style="position: absolute;right: 0px;padding: 5px 13px;display: inline-block; margin-top: 8px;font-size: 18px;">
					<i class="fa fa-bars"></i>
				</span>
				<img style="padding:10px 0px 0px 0px;max-height: 40px;max-width: 100%;" src="@/fs/images/APPShamiblancopartesuperior.svg">
			</div>				
		</ion-header>

		<ion-content :scroll-events="true">

				<router-view></router-view>
	
		</ion-content>

	

		
	<!--</div>-->
</ion-page>
</div>
</template>
<script>
import AppMenu from './Menu.vue'
var app=window.app;
export default {
	mounted(){
			this.$on('close', (m) => {
			console.log("CLOSE ")
			window._.unmask(this.mask);
			console.log(m);
			//this.$refs.menu.hide(m);
			this.$ionic.modalController.dismiss();
			
			});
		app.bindLinks(this.$el,this.hide);
	},
	updated(){
		app.bindLinks(this.$el,this.hide);
		window._.resize();
	},
	created(){
		this.app=window.app;
	},
	components:{AppMenu},
	computed:{
		showMenu(){return app.showMenu;},
		categories(){return app.categories;},
		cart(){return window.app.cart;},
		title(){return this.app.title;},
		session(){return this.app.session;},
		idcategoria(){return this.app.idcategoria;}
	},
	methods:{
		toggleMenu(){
			this.$ionic.menuController.open("menuprincipal");
		},
		hide(){if(this.$refs.menu)this.$refs.menu.hide();},
		opp(path){
			window.app.$router.push('/shami/'+path);
		}
	},
	data:function(){return {app:null,data:[],mode:0}}
};
</script>
<style scope>
	a{
	display:inline-block;
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
	.v-main{
		padding:0px;
		background-color:#FFF;
	}
	.contact svg{
		margin-right: 10px;
		color: orange;
		font-size: 25px;
	}
		.v-ss{

    background-color: #ffecbd;
    border-radius: 35px 35px 0 0;
    float: left;
	}
</style>
<style>
	@media (max-width: 700px){
		.v-popup-2 {
			width: calc(100% - 100px) !important;
			margin: 50px !important;
			top: 30% !important;
			transform: translate(0%,-50%);
		}
	}

	.v-table-buttons{
		top:0px !important;
	}
	#page-content > div > .ui-panel-titlebar{
		display:none;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
	.v-input-field svg{
		margin: 5px;
		opacity:.5;
	}
	.v-form input,.v-form select,.v-form textarea{
		border-radius: 8px !important;
	}
	.v-input-field input{
		width: calc(100% - 31px) !important;
		border-radius: 8px !important;
		padding-left: 26px !important;
	}
	.v-tab-content > span{
		text-align:justify;
		padding:5px 0px;
	}
	.v-accordion > div:not(:last-child) > .v-tab-content{
		padding-bottom:20px;
	}
	.v-accordion > div:not(:last-child){
		border-bottom:1px solid gray;
	}
	.v-accordion > * > .expanded{
		font-weight: bolder;
	}
	.category2{
		display:inline-block;
	}
	.c-4{
		width:calc(33.33% - 0px) !important;
	}
	.subs > div:not(:last-child){
		border: 1px solid gray;
		border-width: 0px 1px 0px 0px;
	}
	#page-header > * {
		min-height: unset;
	}
</style>