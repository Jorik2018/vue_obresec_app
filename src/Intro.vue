<template>
	<div style="position:relative;height:100%;" v-on:click="move">
		<div class="register"  style="z-index:9000">

			<div class="v-form">
				<div v-for="(card,i) in cards" v-show="currentCard==i" v-bind:key="i" v-html="card"></div>
			</div>
			<div class="control">
				<div v-for="(card,i) in cards" v-bind:class="{sel:currentCard==i}" v-bind:key="'b-'+i"></div>
			</div>
			<a href="#" v-on:click="start" style="position: absolute;
    bottom: 20px;
    right: 40px;
    font-weight: bold;
    color: #f2ca1b;">Empezar</a>
		</div>
	</div>
</template>
<script>
	export default window.ui({
		data(){return {
			cards:[
				'<b>Compra</b> fácil, rápido y seguro desde <b>Shami</b>',
				'Accede a promociones, <br/><b>y ofertas exculsivas</b>',
				'<b>Encuentra tu destino,<b/> Bienvenido.'
			],
			cards2:[
				'<b>Vende</b> fácil, rápido y seguro desde <b>Shami</b>',
				'Te ayudamos a <b>llegar a más clientes.</b>',
				'Juntos <b>Reactivando, Áncash.</b>'
			],
			currentCard:0}
		},
		created(){
			var me=this;
			if(me.session.rol==1)me.cards=me.cards2;
		},
		methods:{
			move(){
				var me=this;
				me.currentCard++;
				if(me.currentCard==3)me.start();
			},
			start(){
				localStorage.setItem('intro',true);
				this.open('/shami');
			}
		},
		update(){this.app.bindLinks(this.$el)},	
	});
</script>
<style scoped>
	.control{
		bottom: 20px;
		position: absolute;
	}
	.control > .sel{
		width:30px;
	}
	.control > div{
		background-color: #f2ca1b;
		padding:5px;
		display:inline-block;
		border-radius:5px;
		margin-right:5px;
	}
	.register{
		background-color: white;
		overflow-y: auto;
		font-size:38px;
		z-index:8;
		color:#2a57b5;
		padding: 100px 50px;
		height:100%;
	}
</style>
