<template>
	
	<div class="product-list center" style="background-color:white;padding: 100px 0px;position: relative;">

	<div style="margin: 0px auto;
    padding: 50px;
    font-size: 40px;background-color:white;
    font-weight: bold;
    text-align: left;
    color: rgb(15, 98, 172);
    font-family: Arial Black, Gadget, sans-serif !important;">
	Sé parte del desarrollo de <span style="background-color: rgb(233 188 39);
    padding: 2px 20px;
    font-size: 45px;
    font-family: Arial Black, Gadget, sans-serif !important;
    font-weight: bold;">Áncash</span>
	</div>
	<v-button v-on:click="register" style="    background: unset;
    border-radius: 5px;
    color: #0f62ac;
	width: 80%;
    margin-bottom: 20px;
    border-color: #0f62ac;" value="REGÍSTRATE"/>
	<v-button v-on:click="login" style="    background: unset;
    background-color: #0f62ac;
    border-radius: 5px;
    color: white;
	width: 80%;
    margin-bottom: 20px;
    text-shadow: 0 0 black;
    color: rgb(255 255 255);
    border-color: rgb(15, 98, 172);" value="INICIAR SESIÓN"/>
	</div>
</template>
<script>
export default {
	props:['id'],
	methods:{
		login(){
			this.$router.push('/login');
		},
		register(){}
	},
	data:function(){return {methods:[{id:1,name:'Tarjeta',cards:['','','']},{id:2,name:'Transferencia'},{id:3,name:'Pago de efectivo'}],
		o:{},
		method:{},
		path:process.env.BASE_URL,
		category:{},
		subcategories:[],
		data:[]/*_.app.cartItem*/,mode:0,products:[]
	}}
};
</script>
<style scope>
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
	
	.product2{
		margin-bottom:10px;
		width:calc(33.33% - 4px);display:inline-block;
	}
	.col-0{
		margin-right:4px;
	}
	.col-1{
		margin-right:2px;
		margin-left:2px;
	}
	.col-2{
		margin-left:4px;
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
</style>