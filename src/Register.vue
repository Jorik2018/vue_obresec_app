<template>
	<div class="register">
		<form id="LoginForm">
			<div class="v-form">
				<h1>¡ Ya falta poco !</h1>
				<div style="margin-bottom: 30px;">Por favor completa los siguientes datos</div>
				<label>Correo</label>
				<input type="text" v-model="o.usuario" required />
				<label>Registrarme Como</label>
				<v-select v-model="o.idRol" required  style="width: 100%;">
					<option value="0">--Seleccionar Opción--</option>
					<option value="3">Comprador</option>
					<option value="1">Vendedor</option>
				</v-select>
				<template v-if="o.idRol>0">
					<label>DNI *</label>
					<input type="text" v-model="o.svdPersona.dni" required />
					<label>Nombres *</label>
					<input type="text" v-model="o.svdPersona.nombres" required />
					<label>Apellido Paterno *</label>
					<input type="text" v-model="o.svdPersona.apPaterno" required />
					<label>Apellido Materno *</label>
					<input type="text" v-model="o.svdPersona.apMaterno" required />
					<template v-if="o.idRol==1">
						<label>RUC</label>
						<input type="text" v-model="o.svdPersona.ruc" required />
						<label>Razon Social</label>
						<input type="text" v-model="o.svdPersona.razonSocial"  required />
						<label>Celular *</label>
						<input type="tel" v-model="o.svdPersona.celular" maxlength="12" required />
					</template>
					<label>Contrase&ntilde;a * <span style="font-weight:normal">(8 caracteres min.)</span></label>
					<div style="position:relative"><input v-bind:type="type" v-model="o.clave" minlength="8" required />
											<span v-if="o.clave" style="position:absolute;bottom: 7px;right: 7px;" 
											v-on:click="type=(type=='text'?'password':'text')" v-bind:class="type=='text'?'key':'eye'"><i class="fa" v-bind:class="type=='text'?'fa-key':'fa-eye'"></i></span>
					</div>
					<label>Confirmar Contrase&ntilde;a *</label>
					<input type="password" v-model="o.confirm" minlength="8" required />
					<div style="color:#1162b1;" v-if="o.confirm!=o.clave">Contraseña y confirmar deben ser iguales</div>
					<v-button class="s-button" value="CREAR CUENTA" style="background-color: #1162b1; color: rgb(255 255 255);margin-bottom: 40px;" 
						v-on:click.prevent="register" v-bind:disabled="!o.clave||o.clave.length<8||o.clave!=o.confirm"></v-button>
					<div class="left">
						Al precionar crear cuenta, acepto haber leído los 
						<a class="_" href="https://web.regionancash.gob.pe/" target="_blank">Terminos y Condiciones</a>
						<!--a href="/shami/validate">valda</a-->
					</div>
				</template>
			</div>
		</form>
	</div>
</template>
<script>
	export default window.ui({
		data(){return {type:'password',o:{svdPersona:{}}}},
		update(){this.app.bindLinks(this.$el)},
		methods:{
			register(){
				var me=this;
				if (me.validate(this.$el)) {
					var o=JSON.parse(JSON.stringify(me.o));
					o.svdPersona.correo=o.usuario;
					o.svdRolUsuarios={id:o.idRol};
					delete o.idRol;
					delete o.confirm;
					window.axios.post('/apishami/api/usuarios/crearcuenta/',o)
						.then(response => {
							window._.MsgBox(response.data.msg);
							me.app.usuario=o.usuario;
							me.open('/login');
						}).catch(function(e){
							console.log(e);
						});
				}
			}
		}
	})
</script>
<style scoped>
	label {
		display: inline-block;
		margin-bottom: 0px;
		font-size: 20px;
	}
	.inner input,.inner input:hover{
		border-radius:10px !important;
		opacity:0.7;
		color:white;
		background-color:#0f62ac !important;
	}
	.s-button{
		margin-top:40px;
		background-color: white;
		color: #0f62ac;
	}
	form{
		margin-left: 40px;
		margin-right: 40px;
		margin-top: 10px;
	}
	.register{
		overflow-y: auto;
		height: 100%;
		background-color: #ffe400;
		background: rgb(2,0,36);
		background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(255,228,0,1) 0%, rgba(255,228,106,1) 74%, rgba(43,52,157,1) 82%, rgba(43,52,157,1) 100%);	
	}
	h1 {
		margin-top: 0px;
		font-size: 36px;
	}
	.left,.left a{
		text-align:left;
		display:inline;
		color:white;
	}
	a{
		text-decoration: underline;
	}
	#LoginForm{
		margin-top:50px;
		margin-bottom:30px;
		color:#2858bb;
	}

</style>
