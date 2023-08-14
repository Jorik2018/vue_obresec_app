import Vue from 'vue'
import Router from 'vue-router'
import './cdn/vue-ui.js'
import IsobitUI from 'isobit-ui'
import App from './App.vue'
import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';

import './cdn/isobit.css'
import VOptions from "./o/v-options.vue";


Vue.use(Router);
Vue.use(IsobitUI);
Vue.component("v-options", VOptions);
Vue.use(Ionic);
Vue.config.ignoredElements = [/^ion-/];   // add this line
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
					path: 'crime', props: true,
					component: r => require.ensure([], () => r(require('./admin/crime/List.vue')), 'productosgeneral'),
				},
				{
					path: 'crime/create',
					component: r => require.ensure([], () => r(require('./admin/crime/Create.vue')), 'createe')
				},
				{
					path: 'crime/:id/edit', props: true,
					component: r => require.ensure([], () => r(require('./admin/crime/Create.vue')), 'createe')
				},
				{
					path: 'risk', props: true,
					component: r => require.ensure([], () => r(require('./admin/risk/List.vue')), 'productosgeneral'),
				},
				{
					path: 'risk/create',
					component: r => require.ensure([], () => r(require('./admin/risk/Create.vue')), 'createe')
				},
				{
					path: 'risk/:id/edit', props: true,
					component: r => require.ensure([], () => r(require('./admin/risk/Create.vue')), 'createe')
				},
				{
					path: 'poll/:id', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/Create.vue')), 'createe')
				},
				{
					path: 'poll/:id/a', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/SeccionA.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:id/peoples', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/people/List.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:parent/people', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/people/Create.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:parent/people/:id', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/people/Create.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:id/c', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/SeccionC.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:id/d', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/SeccionD.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:id/e', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/SeccionEList.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:parent/e/:id', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/SeccionE.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:id/f', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/SeccionF.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:id/g', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/SeccionG.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:id/h', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/SeccionH.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:id/i', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/SeccionI.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:id/j', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/SeccionJ.vue')), 'productosgeneral'),
				},
				{
					path: 'poll/:id/k', props: true,
					component: r => require.ensure([], () => r(require('./admin/poll/SeccionK.vue')), 'productosgeneral'),
				},
				{
					path: 'profile',
					component: r => require.ensure([], () => r(require('./admin/Profile.vue')), 'profile')
				}
			]
		}
	]
});


localStorage.setItem('intro', true);
router.beforeEach((to, from, next) => {
	var session = localStorage.getItem('session');
	if (session) session = JSON.parse(session);
	session={};
	//console.log(session);
	if (to.path == '/logout') {
		window.app.session = null;
		localStorage.removeItem('session');
		next('/');
	} else if (!session && !(to.path == '/register' || to.path == '/password' || to.path == '/login')) {
		next('/login');

	} else next();
});
new Vue({
	router,
	render: h => h(App),
	created() { window.$app = this; }
}).$mount('#app')
