<template>
	<div>
		<AppMenu></AppMenu>
		<ion-router-outlet id="main"></ion-router-outlet>
		<ion-page>
			<ion-header id="header-categoria">
				<div class="primary center" style="padding-top: 3px;padding-bottom: 7px;">
					<span  v-on:click="$router.go(-1)" style="position: absolute;left: 0px;padding: 5px 13px;display: inline-block; margin-top: 10px;font-size: 15px;">
						<i class="fa fa-arrow-left"></i>
					</span>
					<span v-on:click="toggleMenu" style="position: absolute;left: 0px;padding: 5px 13px;display: inline-block; margin-top: 8px;font-size: 18px;">
						<i class="fa fa-bars"></i>ghgg
					</span>
					<img style="padding:10px 0px 0px 0px;max-height: 40px;max-width: 100%;" src="@/fs/images/APPShamiblancopartesuperior.svg">
				</div>				
			</ion-header>
			<ion-content :scroll-events="true">
				<router-view></router-view>
			</ion-content>
			<a v-bind:href="'/shami/cart'" class="v-cart">
				<i class="fa fa-shopping-cart" style="color: white;"></i>
				<span v-if="cart.products.length" style="color: white; border-radius: 50%; background-color: red; position: absolute; top: -5px;font-size:14px; ;text-align:center;padding-top:2px;width:28px;height:23px; right: -5px;">
					<template v-if="cart.total<100">{{cart.total}}</template>
					<template v-if="cart.total>99">+99</template>
				</span>
			</a>
		</ion-page>
	</div>
</template>
<script>
import { IonContent} from '@ionic/vue';
//import { close, closeCircle, heart, pin , rocket } from 'ionicons/icons';
import AppMenu from './Menu.vue'
import ModalComponent from './Busqueda.vue'
var app=window.app;
var axios=window.axios;
alert(3);
export default {
	filters: {
		upper(value) {
			return value.toUpperCase();
		}
	},
	//	setup() {return { close, closeCircle, heart, pin , rocket }},
	watch: {
		$route() {
			console.log("ENTRO A ROUTE")
			window._.resize();
			var me=this;
			me.resultVisible=false;
			me.mask=window._.unmask(me.mask);
		}
	},
	mounted(){
		alert(2);
		this.$on('close', (m) => {
			console.log("CLOSE ")
			window._.unmask(this.mask);
			console.log(m);
			//this.$refs.menu.hide(m);
			this.$ionic.modalController.dismiss();
		});
		console.log("ENTRO A MOUNTED")
		app.bindLinks(this.$el,this.hide);
		//this.changeRoute();
		var me=this,el=me.$refs.viewList,c=el.children[3].children;
		console.log(el);
		
		el.addEventListener("parentResize",(e)=>{
			window.cc++;
			if(window.cc>100){
			console.log(window.cc);
			window.cc=0;
			return;
			}
			c=el.children[3].children;
			for(var i=0;i<c.length;i++){
			if(c[i].classList.contains('v-dataview')){
			var event=new CustomEvent("parentResize2", {bubbles: true});
			event.height=e.height;
			c[i].dispatchEvent(event);
			}
			}
		});
	},
	updated(){
	console.log("ENTRO A UPDATE")	
	app.bindLinks(this.$el,this.hide);
	window.app.bindLinks(this.$el);
	window._.resize();
	this.$refs.dataview.load(true); 
	//this.categoria = this.app.idcategoria;
	},
	created(){
	console.log("ENTRO A CREATED "+this.id)
	this.categoria = this.id ;
	var me=this;
	me.app=window.app;
	console.log("APP")
	console.log(me.app)

	me.app.cccc=function(){
	me.resultVisible=false;
	me.mask=window._.unmask(me.mask);
	};
	},
	components:{AppMenu,IonContent},
	props:['id','subcategory'],
	computed:{
	baseURL(){return window.axios.defaults.baseURL;},
	showMenu(){return app.showMenu;},
	categories(){return app.categories;},
	cart(){return window.app.cart;},
	//title(){return this.app.title;},
	idcategoria(){return this.app.idcategoria;},
	filter(){
	var params={};
	console.log("FILTER categoria = "+this.categoria)
	if(this.categoria){
	params.category=this.categoria;
	}
	console.log("FILTER subcategoria = "+this.subcategoria)
	if(this.subcategoria){
	params.subcategory=this.subcategoria;
	}
	return params;
	}
	},
	methods:{
	changeRoute(){
	var c=window.app.categories;
	for(var i=0;i<c.length;i++){
	if(c[i].id==this.categoria){
	this.subcategories=c[i].subcategories;
	this.category=c[i];
	window.app.title=this.category.categoria;
	window.app.idcategoria=this.id;
	window.app.$forceUpdate();
	break;
	}
	}	
	//if(!me.subcategory)
	console.log("entro a changeroute")
	axios.get('/apishami/api/subcategorias/porcategoria/'+this.categoria)
	.then((r) => {
	console.log(r.data)
	this.subcategories=r.data; this.configRegionHabilitado = false;this.province=null;this.cargarProductos();this.$refs.dataview.load(true);
	});


	//if(me.$refs.dataview)me.$refs.dataview.load(true);	
	},
	segmentChanged(evento) {
	//console.log("elegi = "+this.categoria);
	this.subcategoria = null;
	console.log(evento.detail.value)
	window.app.$router.push('/shami/category/'+evento.detail.value);
	this.categoria = evento.detail.value;
	this.changeRoute();	
	},
	toggleMenu(){
	console.log("menu")
	//console.log(this.$refs.menu)
	this.$ionic.menuController.open("menuprincipal");
	//this.$refs.menu.toggle();
	},
	showResult(){
	var me=this;
	if(!me.mask){
	me.mask=window._.mask(me.$refs.dataview.$el.parentNode);
	me.mask.children[0].onclick=me.$refs.dataview.$el.parentNode.onclick=function(e){
	if (e.target !== this)return;
	me.resultVisible=false;
	me.mask=window._.unmask(me.mask);
	}
	}
	me.resultVisible=true;
	me.$refs.dataview.load(true);
	},
	hide(){
	var me=this;
	me.resultVisible=false;
	window._.unmask(me.mask);
	if(me.$refs.menu)me.$refs.menu.hide();
	},
	opp(path){
	window.app.$router.push('/shami/'+path);
	},
	subcateClick(itemid){this.subcategoria = itemid , this.configRegionHabilitado = false; this.province=null; //window.app.$router.push('/shami/category/'+this.id+'/'+this.subcategoria ); 
	},
	verConfigRegion(){ this.province=null;
	this.configRegionHabilitado = !this.configRegionHabilitado;

	},
	cargarProvincias(){
	axios.get('/admin/directory/api/province/0/0?regionId=2')
	.then((r) => {
	console.log("cargar provincias")
	this.listprovincias=r.data;
	console.log(this.listprovincias)
	});

	},
	provinciaChanged(evento){
	console.log(evento)
	console.log(evento.detail.value)
	},
	wish(o){
	window.axios.post('/apishami/api/deseos/crear/',{"svdProducto":{"idProducto":o.id},"svdUsuarios":{"id":window.app.session[0].idUsuario}});
	},
	open(item){
	this.$router.push('/shami/product/'+item.id);
	},
	cargarProductos(){var params={};console.log("FILTER categoria = "+this.categoria)
	if(this.categoria){
	params.category=this.categoria;
	}
	console.log("FILTER subcategoria = "+this.subcategoria)
	if(this.subcategoria){
	params.subcategory=this.subcategoria;
	}

	axios.get('/admin/commerce/api/product/0/20', {
	params: params
	}).then((r) => {
	console.log("cargar productos")
	this.lstProductos=r.data;
	console.log(this.lstProductos)
	});
	},
	openModal() {return this.$ionic.modalController.create({
	component: ModalComponent,
	cssClass: 'modaltodo',
	componentProps: {
	data: {
	content: 'New Content',
	},
	propsData: {
	//user_id: user_id
	},
	parent: this,
	},
	})
	.then(m => m.present({

	}))
	},
	},
	data(){return {app:null,data:[],mask:null,mode:0,query:null,resultVisible:null,categoria:null,subcategories:[],configRegionHabilitado:false,listprovincias:[],category:null,province:null,subcategoria:null ,path:process.env.BASE_URL,lstProductos:[]}}
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
	.subs > div {
		float: left;
		display: inline-block;
		width: calc(25% - 11px);
		font-size: 10px;
		text-align:left;
		padding: 0px 5px;
	}
	.c-4{
		width:calc(33.33% - 11px) !important;
	}
	.subs > div:not(:last-child){
		border: 1px solid gray;
		border-width: 0px 1px 0px 0px;
	}
	.v-cart{
		border-radius: 50%;
		background-color: #0f62ac;
		position: fixed;
		border: #0f62ac;
		right: 15px;
		bottom: 15px;
		padding: 14px;
		display: inline-block;
		box-shadow: 1px 2px 2px #535353a3; /*agregando sombra*/
	}
	.v-cart svg{
		margin-right: 0px;
	}
	#page-header > * {
		min-height: unset;
	}
	#cate.sc-ion-segment-md-h {
    --background:none;
    --background-checked: none;
    --background-hover: rgba(var(--ion-color-primary-rgb,56,128,255),0.04);
    --background-activated: rgba(var(--ion-color-primary-rgb,56,128,255),0.16);
    --color: rgba(var(--ion-text-color-rgb,0,0,0),0.6);
    --color-checked: var(--ion-color-primary,#edbb19);
    --color-checked-disabled: var(--color-checked);
    --indicator-color: transparent;
	}
	#subcate.sc-ion-segment-ios-h {
    --background: transparent;
    --background-hover: rgba(var(--ion-color-primary-rgb,56,128,255),0.1);
    --background-activated: rgba(var(--ion-color-primary-rgb,56,128,255),0.16);
    --background-checked: #ffc107;
    --color: #106e8a;
    --color-checked: var(--ion-color-primary-contrast,#fff);
    --color-disabled: rgba(var(--ion-color-primary-rgb,56,128,255),0.3);
    --color-checked-disabled: rgba(var(--ion-color-primary-contrast-rgb,255,255,255),0.3);
    --border-color: #0f6dc1;
    --indicator-color: transparent;
}
	.category{
		padding:10px;text-align:center;display:inline-block;width:40%
	}
	.subcategory{
		padding: 6px 10px;
		margin-bottom: 10px;
		display: inline-block;
		width: calc(50% - 25px);
		background-color: #dbaa33;
	}
	.subcategory:nth-child(even) {margin-left:5px;}
	.subcategory:nth-child(odd) {margin-right:5px;}
	.v-dataview > .product{
		margin-bottom:10px;
		padding:0px;
		display:inline-block;
	}
	.product.col-0{
		margin-right:3px;
	}
	.product.col-1{
		margin-left:3px;
	}
	.category div{
		height:50px;     
		float: right;width:100%;
	}
	.price{
		color:#dbaa33;
		font-size:12px;
	}
	.product-name{font-weight:bold;min-height:60px;}
	.v-scs{
		background-color: #ffd87a;
	}
	#dataview{      margin-left: 10px;
    margin-right: 10px;
	}

	#stiloimagen{
		min-height:120px;
		position: relative;
		overflow-y: hidden;
		border: 0px solid #d6d6d6;
	}
	#iconocorazon{
		margin-right: 27px;
		color: #ff5a49;
	}
	#iconosproducto{
		margin:15px 0px
	}
	@media (min-width:640px){
		#stiloimagen{
		min-height:230px;
		position: relative;
		overflow-y: hidden;
		border: 0px solid #d6d6d6;
		}
		#iconocorazon{
		margin-right: 40px;
		color: #ff5a49;
		}
		#iconosproducto{
		font-size: 20px;
		margin:15px 0px
		}
	}
	@media only screen and (min-width:600px) and (max-width:640px)
	{
		#stiloimagen{
		min-height: 190px;
		position: relative;
		overflow-y: hidden;
		border: 0px solid #d6d6d6;
		}
		#iconocorazon{
		margin-right: 40px;
		color: #ff5a49;
		}
		#iconosproducto{
		font-size: 20px;
		margin:15px 0px
		}
	}		

</style>