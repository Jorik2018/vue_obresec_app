<template>
	<ion-content :scroll-events="true">
		<v-form style="padding:10px;" class="v-form" store="setting">
			<h2 
			style="padding-left: 34px;margin-bottom:20px;position: relative;font-size: 24px;background-color: transparent;">
			<i class="fa fa-sliders-h" style="position: absolute; left: 2px; top: 3px;"></i>
			Configuracion</h2>
			<v-fieldset :key="k" :title="k" legend="Juridiccion de encuesta predeterminada">
				<v-button icon="fa fa-sync" value="Recuperar Datos Maestros" 
				@click="load" style="width:-webkit-fill-available;"/>
				<template v-if="false">
				<label>Red:</label>
				<v-select v-model="o.red"
					ref="redSelect"
					:label="o.regionName?o.regionName:'---'"
					@input="$refs.microredSelect.load({codigo_red:o.red})">
					<option value="">Seleccionar Opción</option>
					<v-options store="red" display-field="name" value-field="code"/>
				</v-select>
				<label>Microred:</label>
				<v-select autoload="false" :disabled="!o.red" ref="microredSelect" v-model="o.microred" 
						:required="true" @input="$refs.establishment.load({codigo_cocadenado:o.microred})"> 
					<option>Select One...</option> 
					<v-options store="microred" display-field="name" value-field="code"/>
				</v-select> 
				<label>Establecimiento:</label>
				<v-select ref="establishment" v-model="o.establishment" :autoload="false" :disabled="!o.microred" :required="true"> 
					<option>Select One...</option> 
					<v-options store="establishment" display-field="name" value-field="code"/>
				</v-select>
				</template>
				<label>Departamento:</label>
				<v-select v-model="o.region"
					ref="regionSelect"
					:label="o.regionName?o.regionName:'---'"
					@input="$refs.provinceSelect.load({code:o.region?o.region.code:'*'})">
					<option value="">Seleccionar Opción</option>
					<v-options store="region" display-field="name"/>
				</v-select>
				<label>Provincia:</label>
				<v-select id="prov" :label="o.provinceName?o.provinceName:'---'"
					autoload="false" :disabled="!o.region" ref="provinceSelect" v-model="o.province" 
					@input="$refs.districtSelect.load({code:o.province?o.province.code:'*'})">
					<option value="">Seleccionar Opción</option>
					<v-options store="province" display-field="name"/>
				</v-select>
				<label>Distrito:</label>
				<v-select 
					autoload="false" :label="o.districtName?o.districtName:'---'" 
					:disabled="!o.province" 
					@input="$refs.cpSelect.load({id:o.district?o.district.code:'*'})"
					ref="districtSelect" v-model="o.district" >

					<option value="">Seleccionar Opción</option>
					<v-options store="district" display-field="name"/>
				</v-select>
				<label>Centro Poblado:</label>
				<v-select 
					autoload="false" :label="o.districtName?o.districtName:'---'" :disabled="!o.district" 
					ref="cpSelect" v-model="o.town" >
					<option value="">Seleccionar Opción</option>
					<v-options store="town" display-field="name"/>
				</v-select>
				<v-button icon="fa fa-save" value="Guardar Seleccion" @click="save" style="margin-top:10px;width:-webkit-fill-available;"/>
			
			</v-fieldset>
		</v-form>
	</ion-content>
</template>
<script>

export default window._.ui({
	props:['id'],
	data(){return{o:{red:null,microred:null,establishment:null,region:null,province:null,district:null,town:null},k:0,memo:{}}},
	created(){
		try{
			var s=localStorage.getItem('setting');
			s=JSON.parse(s);	
			if(s){
				var o=this.o;
			o.red=s.red;
			o.microred=s.microred;
			o.region=s.region;
			o.province=s.province;
			console.log(o.province);
			o.district=s.district;
			o.establishment=s.establishment;
			o.town=s.town;
			this.k++;
			}
			
		}catch(e){
			console.log(e);
		}
	},
	methods:{
		load(){
			var me=this,axios=window.axios;
			var timer,k=this.k;
			var tt=function(){
					me.k++;
					console.log(k);
				}
			var add =function(){
				clearTimeout(timer);
				timer=setTimeout(tt, 500);
			}
			axios.get('/admin/directory/api/town/0/0').then(function(r){
				var db=window._.db,objectStore =db.transaction(["town"], "readwrite").objectStore("town");
				var data=r.data;
				objectStore.clear().onsuccess = () => {
					for (var i in data){
						add(objectStore.add(data[i]));
					}
				};
			});
			axios.get('/admin/desarrollo-social/api/red/0/0').then(function(r){
				var db=window._.db,objectStore =db.transaction(["red"], "readwrite").objectStore("red");
				var data=r.data;
				for (var i in data)add(objectStore.add(data[i]));
			});
			axios.get('/admin/desarrollo-social/api/microred/0/0').then(function(r){
				var db=window._.db,objectStore =db.transaction(["microred"], "readwrite").objectStore("microred");
				var data=r.data;
				for (var i in data)objectStore.add(data[i]);
			});
			axios.get('/admin/desarrollo-social/api/establishment/0/0').then(function(r){
				var db=window._.db,objectStore =db.transaction(["establishment"], "readwrite").objectStore("establishment");
				var data=r.data;
				for (var i in data)objectStore.add(data[i]);
			});
			axios.get('/admin/directory/api/district/0/0').then(function(r){
				var db=window._.db,objectStore =db.transaction(["district"], "readwrite").objectStore("district");
				var data=r.data;
				for (var i in data)objectStore.add(data[i]);
			});
			axios.get('/admin/directory/api/region/0/0').then(function(r){
				var db=window._.db,objectStore =db.transaction(["region"], "readwrite").objectStore("region");
				var data=r.data;
				for (var i in data)add(objectStore.add(data[i]));
			});
			axios.get('/admin/directory/api/province/0/0').then(function(r){
				var db=window._.db,objectStore =db.transaction(["province"], "readwrite").objectStore("province");
				var data=r.data;
				for (var i in data){
					var request =objectStore.add(data[i]);
					request.onerror = function(event) {
						console.log(event);
					}
				}
			});
			axios.get('/api/poll/sample/0/0').then(function(r){
				var db=window._.db,objectStore =db.transaction(["sample"], "readwrite").objectStore("sample");
				var data=r.data;
				objectStore.clear().onsuccess = () => {
					for (var i in data){
						add(objectStore.add(data[i]));
					}
				};
			});
			this.k=0;
		},
		save(){
			localStorage.setItem('setting',JSON.stringify(this.o));	
			this.app.toast('Configuracion grabada!');
		},
		changeRegion(e,o,s){
			s.load({regionId:o.id});
		},
		
		changeDistrict(){},
		
		changeProvince(e,o,s){
			s.load({provinceId:o.code});
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