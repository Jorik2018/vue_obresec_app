<template>
	<ion-content :scroll-events="true" >
		<v-form ref="form" style="padding:10px;" class="v-form" 
			:class="o.id<0||(o.tmpId&&!o.synchronized)?'yellow':(o.tmpId?'green':'')" store="people" 
			action="/api/poll/people">
			<a href="#" class="v-button-top-float" v-on:click="save"><i class="fa fa-save"></i></a>	
			<h2 
			style="margin-right: 50px;padding-left: 34px;margin-bottom:20px;position: relative;font-size: 24px;background-color: transparent;">
			<i class="fa fa-home" style="position: absolute; left: 2px; top: 3px;"></i>
			SECCIÓN B: CARACTERÍSTICAS SOCIODEMOGRÁFICAS I (Responden todos los miembros del hogar según edad)</h2>
			<div v-bind:class="o.id<0?'yellow':''">ENCUESTA={{o.encuesta_id}} > ID={{o.id}}</div>
			<v-fieldset legend="NOMBRES Y APELLIDOS">
				<input v-model="o.fullName" required="required" maxlength="150"/>
			</v-fieldset>
			<v-fieldset legend="12. RELACIÓN CON EL JEFE DE HOGAR">
				<v-radio-group v-model="o.p_12" >
					<v-radio value="1" label="Jefe/a de hogar"/>
					<v-radio value="2" label="Esposo/a – compañero/a – conviviente del jefe/a de hogar"/>
					<v-radio value="3" label="Hijo/a – Hijastro/a"/>
					<v-radio value="4" label="Yerno/Nuera del jefe/a de hogar"/>
					<v-radio value="5" label="Nieto/a del jefe/a de hogar"/>
					<v-radio value="6" label="Padres/Suegros del jefe/a de hogar"/>
					<v-radio value="7" label="Hermano/a del jefe/a de hogar"/>
					<v-radio value="8" label="Otros parientes del jefe/a de hogar"/>
					<v-radio value="8" label="Trabajador del hogar sin parentesco con el jefe/a de hogar"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset legend="13. ES MIEMBRO DEL HOGAR">
				<v-radio-group v-model="o.p_13" >
					<v-radio value="1" label="Si"/>
					<v-radio value="2" label="No"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset legend="14. EDAD EN AÑOS">
				<v-number v-model="o.p_14" required="required"/>
			</v-fieldset>
			<v-fieldset legend="15. SEXO">
				<v-radio-group v-model="o.p_15" >
					<v-radio value="1" label="Masculino"/>
					<v-radio value="2" label="Femenino"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset legend="16. TIENE ALGÚN TIPO DE DISCAPACIDAD">
				<v-radio-group v-model="o.p_16" >
					<v-radio value="1" label="Si"/>
					<v-radio value="2" label="No"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset legend="17. SABE LEER Y ESCRIBIR">
				<v-radio-group v-model="o.p_17" >
					<v-radio value="1" label="Si"/>
					<v-radio value="2" label="No"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset legend="18. ¿CUÁL ES EL ÚLTIMO NIVEL DE ESTUDIOS QUE APROBÓ?">
				<v-radio-group v-model="o.p_18" >
					<v-radio value="1" label="Sin nivel"/>
					<v-radio value="2" label="Educación inicial"/>
					<v-radio value="3" label="Primaria incompleta"/>
					<v-radio value="4" label="Primaria completa"/>
					<v-radio value="5" label="Secundaria incompleta"/>
					<v-radio value="6" label="Secundaria completa"/>
					<v-radio value="7" label="Sup. No universitaria incompleta"/>
					<v-radio value="8" label="Sup. No universitaria completa"/>
					<v-radio value="9" label="Sup. Universitaria incompleta"/>
					<v-radio value="10" label="Superior Universitaria completa"/>
					<v-radio value="11" label="Postgrado Universitario"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset v-if="o.p_14>=5" legend="19. ¿EL 2020 ESTUVO MATRICULADO EN ALGÚN PROGRAMA DE EDUCACIÓN BÁSICA, TÉCNICO PRODUCTIVA O SUPERIOR?">
				<v-radio-group v-model="o.p_19" >
					<v-radio value="1" label="Si [Accede a P35]"/>
					<v-radio value="2" label="No [Pase a P40]"/>
				</v-radio-group>
			</v-fieldset>
			<v-fieldset legend="20. ¿YA SE ENCUENTRA VACUNADO CONTRAL EL COVID-19?">
					<v-radio-group v-model="o.p_20" >
						<v-radio value="1" label="Si"/>
						<div v-if="o.p_20==1" style="margin-bottom:20px;">
							<label>Número de dosis recibida</label>
							<v-number v-model="o.p_20_1"/>
						</div>
						<v-radio value="2" label="No. Porque aún no me encuentro dentro del rango etario de vacunación"/>
						<v-radio value="3" label="No, porque tengo que esperar un tiempo para vacunarme luego de haberme recuperado del COVID-19"/>
						<v-radio value="4" label="No. No pienso vacunarme aún así me encuentre dentro del rango etario de vacunación"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="21. FUE DIAGNOSTICADO CON ALGUNA DE LAS SIGUIENTES ENFERMEDADES Y/O TIENE ALGUNA DE LAS SIGUIENTES CONDICIONES? (Marcar más de una opción si aplica)">
					<v-checkbox v-model="o.p_21_1" label="Cáncer"/>
					<v-checkbox v-model="o.p_21_2" label="VIH"/>
					<v-checkbox v-model="o.p_21_3" label="Enfermedad renal crónica"/>
					<v-checkbox v-model="o.p_21_4" label="Trastorno mental"/>
					<v-checkbox v-model="o.p_21_5" label="Enfermedades rara o huerfana"/>
					<v-checkbox v-model="o.p_21_6" label="Diabetes I o II"/>
					<v-checkbox v-model="o.p_21_7" label="Obesidad mórbida"/>
					<v-checkbox v-model="o.p_21_8" label="Hipertensión"/>
					<v-checkbox v-model="o.p_21_9" label="Anemia"/>
					<v-checkbox v-model="o.p_21_10" label="Desnutrición crónica"/>
					<v-checkbox v-model="o.p_21_11" label="Está gestando"/> 
					<v-checkbox v-model="o.p_21_12" label="Está a la espera de un trasplante de órgano"/>
					<v-checkbox v-model="o.p_21_13" label="Otras enfermedades"/> 
					<v-checkbox v-model="o.p_21_14" label="Ninguna"/>
				</v-fieldset>
				<v-fieldset legend="22. DURANTE EL ÚLTIMO AÑO ¿A DÓNDE ACUDÍO LA ÚLTIMA VEZ QUE REQUIRIÓ ASISTENCIA  MÉDICA PARA TRATAR ESTAS CONDICIONES Y/O ENFERMEDADES, SEGÚN SEA EL CASO? EL ÙLTIMO AÑO CUÀNDO REQUIRIÓ ASISTENCIA ">
					<v-radio-group v-model="o.p_22" >
						<v-radio value="1" label="Centro o puesto de salud MINSA"/>
						<v-radio value="2" label="Centro o puesto de salud CLAS"/>
						<v-radio value="3" label="Centro o puesto de salud ESSALUD"/>
						<v-radio value="4" label="Hospital MINSA, CLAS, ESSALUD, FFAA o de la Policía Nacional"/>
						<v-radio value="5" label="Consultorio Médico Particular o Clínica Particular"/>
						<v-radio value="6" label="Farmacia o Botica"/>
						<v-radio value="7" label="Domicilio"/>
						<v-radio value="8" label="Otro"/>
						<v-radio value="9" label="No recibió atención médica a pesar de concurrir a un centro de salud"/>
						<v-radio value="10" label="No buscó atención"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="23. COMO CONSECUENCIA DE LA CUARENTENA Y ESTADO DE EMERGENCIA SANITARIA, ¿USTED MIGRÓ DESDE SU LOCALIDAD DE RESIDENCIA HABITUAL HACIA LA LOCALIDAD EN LA QUE NACIÓ, CRECIÓ Y/O CUENTA CON FAMILIARES? ">
					<v-radio-group v-model="o.p_23" >
						<v-radio value="1" label="Sí [Accede a P24]"/>
						<v-radio value="2" label="No [Pase a P26]"/>
					</v-radio-group>
				</v-fieldset>
				<template v-if="o.p_23==1">
					<v-fieldset legend="24. ¿CUÁL FUE LA PRINCIPAL RAZÓN QUE MOTIVÓ EL MOVIMIENTO MIGRATORIO PREVIAMENTE ALUDIDO?">
						<v-radio-group v-model="o.p_24" >
							<v-radio value="1" label="Temor al COVID-19"/>
							<v-radio value="2" label="Pérdida de empleo por la cuarentena y emergencia sanitaria"/>
							<v-radio value="3" label="Falta de recursos en la localidad de residencia habitual"/>
							<v-radio value="4" label="El movimiento migratorio es temporal y se espera retornar al local de residencia habitual al ‘normalizarse’ la situación"/>
						</v-radio-group>
					</v-fieldset>
					<v-fieldset legend="25. DESDE SU LLEGADA, ¿QUÉ ACTIVIDADES REALIZÓ PARA GENERAR INGRESOS? (Marcar más de una opción si aplica)">
						<v-checkbox v-model="o.p_25_1" label="Obtuve un empleo remunerado que me permitía percibir ingresos con frecuencia semanal, quincenal, mensual, etc."/>
						<v-checkbox v-model="o.p_25_2" label="Laboré a destajo (trabajo remunerado con pagos de frecuencia aleatoria)"/>
						<v-checkbox v-model="o.p_25_3" label="Trabajé en la unidad familiar sin remuneración"/>
						<v-checkbox v-model="o.p_25_4" label="Trabajé en la unidad familiar con remuneración"/>
						<v-checkbox v-model="o.p_25_5" label="Inicié un emprendimiento personal que no requiere contratar trabajadores"/>
						<v-checkbox v-model="o.p_25_6" label="Inicié un emprendimiento personal que contrata trabajadores"/>
						<v-checkbox v-model="o.p_25_7" label="No laboré"/>
					</v-fieldset>
				</template>
				<template v-if="o.p_14>=14">
				<h2 
			style="margin-right: 50px;padding-left: 34px;margin-bottom:20px;margin-top:20px;position: relative;font-size: 24px;background-color: transparent;">

			SECCIÓN C: FUENTES DE INGRESO I [Debe ser respondida por todo miembro del hogar mayor de 14 años de edad ]</h2>
				<v-fieldset legend="26. CONDICIÓN DE ACTIVIDAD EN LA SEMANA PASADA">
					<v-radio-group v-model="o.p_26" >
						<v-radio value="1" label="Trabajó"/>
						<v-radio value="2" label="Busco trabajo"/>
						<v-radio value="3" label="No se encuentra laborando y tampoco buscó trabajo"/>
						<v-radio value="4" label="Trabaja y estudia"/>
						<v-radio value="5" label="Solo estudia"/>
						<v-radio value="6" label="Solo tareas del hogar"/>
						<v-radio value="7" label="Jubilado o cesante"/>
						<v-radio value="8" label="Enfermo"/>
					</v-radio-group>
				</v-fieldset>
				<template v-if="o.p_26==1||o.p_26==4">
				<v-fieldset legend="27. SECTOR DE ACTIVIDAD EN EL QUE TRABAJÓ LA SEMANA PASADA">
					<v-radio-group v-model="o.p_27" >
						<v-radio value="1" label="Agrícola"/>
						<v-radio value="2" label="Pecuario"/>
						<v-radio value="3" label="Pesca"/>
						<v-radio value="4" label="Minería"/>
						<v-radio value="5" label="Manufactura"/>
						<v-radio value="6" label="Construcción"/>
						<v-radio value="7" label="Comercio"/>
						<v-radio value="8" label="Transportes y comunicaciones"/>
						<v-radio value="9" label="Servicios"/>
					</v-radio-group>
				</v-fieldset>
				<v-fieldset legend="28. DE HABER DESEMPEÑADO ALGUNA ACTIVIDAD LABORAL, UD. SE DESEMPEÑO COMO. ">
					<v-radio-group v-model="o.p_28" >
						<v-radio value="1" label="Empleador o patrono"/>
						<v-radio value="2" label="Trabajador independiente"/>
						<v-radio value="3" label="Empleado"/>
						<v-radio value="4" label="Obrero"/>
						<v-radio value="5" label="Trabajador familiar no remunerado"/>
						<v-radio value="6" label="Trabajador del hogar"/>
						<v-radio value="7" label="Otro"/>
						<input v-if="o.p_28==7" v-model="o.p_28_1"/>
					</v-radio-group>
				</v-fieldset>
			</template>
				<v-fieldset legend="29. SIN DISTINGUIR FUENTE DE INGRESO, A CUÁNTO ASCENDIÓ SU INGRESO  TOTAL DURANTE EL ÚLTIMO MES? (De percibirse con una frecuencia distinta, transformar el monto a una escala mensual considerando 30 días calendario)">
					<v-number v-model="o.p_29"/>
				</v-fieldset>
				<v-fieldset legend="29-A. ¿A CUÁNTO ASCENDIERON  SUS INGRESOS PROVENIENTES DEL TRABAJO DURANTE EL ÚLTIMO MES? (De percibir ingresos en especie, monetizarlos y expresarlos en frecuencia mensual)">
					<v-number v-model="o.p_29_a"/>
				</v-fieldset>
				<v-fieldset legend="29-B. ¿A CUÁNTO ASCENDIERON  SUS INGRESOS POR CONCEPTO DE 
REMESAS ENVIADAS POR FAMILIARES O AMIGOS Y/O AYUDA SOCIAL BRINDADA POR ENTIDADES NO-GUBERNAMENTALES DURANTE EL ÚLTIMO MES?
(De percibir transferencias en especies, asígnele un valor monetario y expresarlos en frecuencia mensual)
">
					<v-number v-model="o.p_29_b"/>
				</v-fieldset>
				<v-fieldset legend="29-C. ¿EN EL ÚLTIMO MES, A CUÁNTO ASCENDIERON  SUS INGRESOS POR CONCEPTO DE BONOS FAMILIARES Y/O UNIVERSALES BRINDADOS POR EL GOBIERNO? ">
					<v-number v-model="o.p_29_c"/>
				</v-fieldset>
				<v-fieldset legend="29-D. ¿EN EL ÚLTIMO MES, A CUÁNTO ASCENDIERON  SUS INGRESOS POR CONCEPTO DE OTRAS TRANSFERENCIAS BRINDADAS (PROGRAMAS SOCIALES, BECAS, FONDOS DE AYUDA PARA LA COMPETITIVIDAD, ETC) POR EL GOBIERNO? (De percibir transferencias en especie como en el caso de desayunos escolares Qali Warma, asígnele un valor monetario expresado en frecuencia mensual)">
					<v-number v-model="o.p_29_d"/>
				</v-fieldset>
				<v-fieldset legend="29-E. ¿EN EL ÚLTIMO MES, A CUÁNTO ASCENDIERON SUS INGRESOS POR RENTAS Y/O ALQUILERES?">
					<v-number v-model="o.p_29_e"/>
				</v-fieldset>
				<v-fieldset legend="29-F. ¿EN EL ÚLTIMO MES, A CUÁNTO ASCENDIERON SUS INGRESOS PROVENIENTES DE OTRAS FUENTES DISTINTAS A LAS ANTERIORMENTE CONSIDERADAS?">
					<v-number v-model="o.p_29_f"/>
				</v-fieldset>
			</template>
		</v-form>
	</ion-content>
</template>
<script>
import {IonContent} from '@ionic/vue';
export default window._.ui({
	components:{IonContent},
	props:['id','parent'],
	data(){return{o:{id:null,encuesta_id:null,synchronized:null}}},
	created(){
		var me=this;
		me.$on('sync',me.app.onSyncPeople);
		me.$on('stored',me.app.onStoredPeople);
	},
	mounted(){this.changeRoute();},
	methods:{
		changeRoute(){
			var me=this,id=me.id;
			me.o.encuesta_id=me.parent;
			//es un registro temporal
			if(id<0){
				var item=window._.db.transaction(["people"], "readwrite").objectStore("people").get(-id);
				item.onsuccess = function() {
					if(item.result){
						me.o=item.result;
					}
				};
			}else if(id){
				window.axios.get('/api/poll/people/'+id,{params:{poll:me.app.poll}}).then((d)=>{
					me.o=d.data;
				});
			}else if(me.o.encuesta_id<0){
				//Si el padre es temporal se indica que el registro sera temporal
				me.o.tmpId=+new Date();
			}
		},
		process(o){
			o.poll=this.app.poll;
			return o;
		},
		close(o){
			var me=this,route;
			if(o.data.id){
				me.o.id=o.data.id;
				route=me.o.id!=o.data.id;
			}
			if(o.data.tmpId)me.o.tmpId=o.data.tmpId;
			if(route)
			me.$router.replace('/admin/poll/'+me.o.encuesta_id+'/people/'+me.o.id);
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