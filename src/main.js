import Vue from 'vue'
import Router from 'vue-router'
import './cdn/vue-ui.js'
import IsobitUI from 'isobit-ui'
import App from './App.vue'
import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
import './cdn/isobit.css'
import VueI18n from 'vue-i18n';

import * as olProj from 'ol/proj';
import Map from 'ol/Map'
import View from 'ol/View'
import Collection from 'ol/Collection'
import {Fill, Stroke, Style, Circle, RegularShape} from 'ol/style'
import {Tile,Vector as VectorLayer} from 'ol/layer'
import {OSM,Vector} from 'ol/source'
import Point from 'ol/geom/Point'
import Control from 'ol/control/Control'
import FullScreen from 'ol/control/FullScreen'
import Overlay from 'ol/Overlay'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import Translate from 'ol/interaction/Translate'
import Text from  'ol/style/Text'

window.ol={
	Overlay:Overlay,
	Feature:Feature,
	proj:olProj,
	interaction:{Translate:Translate},
	format:{GeoJSON:GeoJSON},
	geom:{Point:Point},
	control:{Control:Control,FullScreen:FullScreen},
	Map:Map,
	View:View,
	Collection:Collection,
	source:{OSM:OSM,Vector:Vector},
	layer:{Tile:Tile,Vector:VectorLayer},
	style:{Style:Style,Stroke:Stroke,Text:Text,Fill:Fill,Circle:Circle,RegularShape:RegularShape}
}


Vue.use(VueI18n);
Vue.use(Router);
Vue.use(IsobitUI);
Vue.use(Ionic);
Vue.config.ignoredElements = [/^ion-/,/^v-/];   // add this line
Vue.config.productionTip = false;

Vue.filter('upper', (s) => {
	return s ? s.toUpperCase() : s;
});
const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '',
			component: r => require.ensure([], () => r(require('./Template.vue')), 'productosgeneral'),
		},
		{
			path: '/login',
			component: r => require.ensure([], () => r(require('./Login.vue')), 'login')
		},
		{
			path: '/register',
			component: r => require.ensure([], () => r(require('./Register.vue')), 'registros')
		},
		{
			path: '/password',
			component: r => require.ensure([], () => r(require('./Password.vue')), 'password')
		},
		{
			path: '/introduction',
			component: r => require.ensure([], () => r(require('./Introduction.vue')), 'introduction-pages')
		},
		{
			path: '/shami/intro',
			component: r => require.ensure([], () => r(require('./Intro.vue')), 'introduction-pages')
		},
		{
			path: '/shami/search', props: true,
			component: r => require.ensure([], () => r(require('./Template2.vue')), 'search'),
		},
		{
			path: '/admin',
			component: r => require.ensure([], () => r(require('./Template.vue')), 'template'),
			children: [
				{
					path: 'setting', props: true,
					component: r => require.ensure([], () => r(require('./admin/Setting.vue')), 'productosgeneral'),
				},
				{
					path: 'notification',
					component: r => require.ensure([], () => r(require('./admin/Notifications.vue')), 'notifications')
				},
		
						{
							path: 'obresec/crime', props: true,
							component: r => require.ensure([], () => r(require('./admin/crime/List.vue')), 'productosgeneral'),
						},
						{
							path: 'obresec/crime/create',
							component: r => require.ensure([], () => r(require('./admin/crime/Create.vue')), 'createe')
						},
						{
							path: 'obresec/crime/:id/edit', props: true,
							component: r => require.ensure([], () => r(require('./admin/crime/Create.vue')), 'createe')
						},
						{
							path: 'obresec/crime/type', props: true,
							component: r => require.ensure([], () => r(require('./admin/crime/type/List.vue')), 'crime-type'),
						},
						{
							path: 'obresec/crime/category', props: true,
							component: r => require.ensure([], () => r(require('./admin/crime/category/List.vue')), 'crime-catogory'),
						},
						{
							path: 'obresec/crime/category/:id/edit', props: true,
							component: r => require.ensure([], () => r(require('./admin/crime/category/Create.vue')), 'crime-catogory'),
						},
						{
							path: 'obresec/crime/category/create', props: true,
							component: r => require.ensure([], () => r(require('./admin/crime/category/Create.vue')), 'crime-catogory'),
						},
						{
							path: 'obresec/risk', props: true,
							component: r => require.ensure([], () => r(require('./admin/risk/List.vue')), 'productosgeneral'),
						},
						{
							path: 'obresec/risk/create',
							component: r => require.ensure([], () => r(require('./admin/risk/Create.vue')), 'createe')
						},
						{
							path: 'obresec/risk/:id/edit', props: true,
							component: r => require.ensure([], () => r(require('./admin/risk/Create.vue')), 'createe')
						},
						{
							path: 'obresec/risk/type', props: true,
							component: r => require.ensure([], () => r(require('./admin/risk/type/List.vue')), 'risk-type'),
						}
					
				,				
				{
					path: 'profile',
					component: r => require.ensure([], () => r(require('./admin/Profile.vue')), 'profile')
				}
			]
		}
	]
});


localStorage.setItem('intro', true);
router.beforeEach(async (to, from, next) => {
	

	
	var session = localStorage.getItem('session');
	if (session) session = JSON.parse(session);
	if (to.path == '/logout') {
		window.app.session = null;
		localStorage.removeItem('session');
		next('/');
	} else {
		if(to.path == '/register' || to.path == '/password' || to.path == '/login'){
			next();
		}else{
			/*if (!session||!session.token) {
				const url = new URL(window.location);
				location.href = `${process.env.VUE_APP_OAUTH_URL}/authorize?response_type=code&client_id=${process.env.VUE_APP_OAUTH_CLIENT_ID}&scope=profile&destiny=`+url.pathname;
				//next('/login');
			} else {*/
				next();
			//}
		}
	}
});
	const messages = {
		en: {
			Report: 'Reports',
			RegisterDate: 'Fecha Registro',
			Sex: 'Sexo',
			Create: 'Crear',
			Edit: 'Editar',
			From: 'Desde',
			Save: 'Grabar',
			CrimeCategory: 'Categoría Delito',
			Observation: 'Observación',
			To: 'Hasta',
			Description: 'Descripción',
			Delete: 'Eliminar',
			Province: 'Provincia',
			GeographicLocation: 'Ubicación Geográfica',
			Type: 'Tipo',
			Date: 'Fecha',
			District: 'Distrito'
		}
	};
  
  const i18n = new VueI18n({
	locale: 'en', // Set the initial locale
	messages,
  });

new Vue({
	router,
	render: h => h(App),
	i18n,
	created() { window.$app = this; }
}).$mount('#app')
