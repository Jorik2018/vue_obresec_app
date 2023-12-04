<template>
	<router-view></router-view>
</template>
<script>
import './cdn/vue-ui.js'
import "ol/ol.css";
import { LocalNotifications } from "@capacitor/local-notifications";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { Network } from '@capacitor/network';

var { _, ui, axios } = window;
//import { App as CapacitorApp } from '@capacitor/app';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
export default ui({
	async created() {
		let me = this;
		let session = me.session;

		const url = new URL(window.location);
		const code = url.searchParams.get("code");
		if (code) {
			let response = await axios.post(process.env.VUE_APP_BASE_URL +
				'/api/auth/token', code, {
				headers: { 'Content-Type': 'text/plain' },
			});
			const session = response.data;
			session.perms = session.perms.reduce((a, current) => {
				a[current] = 1; return a;
			}, {});
			localStorage.setItem('session', JSON.stringify(session));
			window.axios.defaults.headers.common = {
				Authorization: `Bearer ${session.token}`
			};
			url.searchParams.delete('code');
			window.location.replace(url);
			return;
		}
		if(!session||!session.token){
			location.href = `${process.env.VUE_APP_OAUTH_URL}/authorize?response_type=code&client_id=${process.env.VUE_APP_OAUTH_CLIENT_ID}&scope=profile&destiny=`+url.pathname;
			return;
		}

		_.app = me;
		let networkStatusChange = (status) => {
			_.networkStatus = status;
			me.networkStatus = status;
		};
		Network.addListener("networkStatusChange", networkStatusChange);
		Network.getStatus().then(networkStatusChange);

		if (session.token) {
			me.ok = true;
			axios.defaults.headers.common = {
				Authorization:
					`Bearer ` + (session.token ? session.token : session.uid),
			};
			me.profileImg = session.people ? session.people.urlPerfil : null;
		} else {
			location.href = `${process.env.VUE_APP_OAUTH_URL}/authorize?response_type=code&client_id=${process.env.VUE_APP_OAUTH_CLIENT_ID}&scope=profile`;
			//me.$router.push("/login");
		}



		window.o = me.o;
		_.initDB(14, [
			["region", { keyPath: "id" }, "/api/directory/region/0/0"],
			["province", { keyPath: "code" }, "/api/directory/province/0/0"],
			["district", { keyPath: "code" }, "/api/directory/district/0/0"],
			["town", { keyPath: "id" }, "/api/directory/town/0/0", "district"],
			["sample", { keyPath: "id" }],
			["pool", { keyPath: "tmpId" }],
			["people", { keyPath: "tmpId" }],
			["pregnant", { keyPath: "tmpId" }],
			["pregnant_visit", { keyPath: "tmpId" }],
			["agreement", { keyPath: "tmpId" }],
			["red", { keyPath: "code" }, "/api/desarrollo-social/red/0/0"],
			["microred", { keyPath: "ID" }, "/api/desarrollo-social/microred/0/0"],
			["establishment", { keyPath: "code" }, "/api/desarrollo-social/establishment/0/0"],
			["setting", { keyPath: "code" }]
		]);
	},
	data() {
		return {
			poll: 3,
			ok: false,
			iconoConClick: false,
			ws: null,
			title: '',
			icono: '',
			categories: [],
			notification: [],
			profileImg: null,
			ki: 0,
			imgError: null,
			k: 0,
			networkStatus: {},
			idcategoria: null,
			showMenu: false,
			showUser: false,
			overlay: null
		}
	},
	methods: {
		getElementY(query) {
			return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
		},
		doScrolling(element, duration) {
			var startingY = window.pageYOffset;
			var elementY = this.getElementY(element);
			var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
			var diff = targetY - startingY
			// Easing function: easeInOutCubic
			// From: https://gist.github.com/gre/1650294
			var easing = function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }
			var start
			if (!diff) return
			// Bootstrap our animation - it will get called right before next frame shall be rendered.
			window.requestAnimationFrame(function step(timestamp) {
				if (!start) start = timestamp
				// Elapsed miliseconds since start of scrolling.
				var time = timestamp - start
				// Get percent of completion in range [0, 1].
				var percent = Math.min(time / duration, 1)
				// Apply the easing.
				// It can cause bad-looking slow frames in browser performance tool, so be careful.
				percent = easing(percent)
				window.scrollTo(0, startingY + diff * percent);
				if (time < duration) {
					window.requestAnimationFrame(step)
				}
			})
		},
		connect() {
			var me = this, session = localStorage.getItem('session');
			if (session) {
				session = JSON.parse(session);
			}
			if (session != null) {
				var ws = new WebSocket("wss://web.regionancash.gob.pe/ws/S" + session.uid);
				ws.onopen = function () {
					// subscribe to some channels
					//ws.send(JSON.stringify({
					//.... some message the I must send when I connect ....
					//}));
				};
				ws.onmessage = function (e) {
					me.notify({ body: e.data.msg ? e.data.msg : e.data, title: 'SHAMI APP' });
				};
				ws.onclose = function (e) {
					console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
					setTimeout(function () {
						me.connect();
					}, 5000);
				};
				ws.onerror = function (err) {
					console.error('Socket encountered error: ', err.message, 'Closing socket');
					ws.close();
				};
				me.ws = ws;
			}
		},
		async notify(o) {
			const notifs = await LocalNotifications.schedule({
				notifications: [
					{
						title: o.title,
						body: o.body,
						id: 1,
						/*schedule: { at: new Date(Date.now() + 1000 * 5) },*/
						sound: 'file://sound.mp3',
						attachments: null,
						actionTypeId: '',
						extra: null
					}
				]
			});
			this.notification.push(o);
			console.log('scheduled notifications', notifs);
		},
		onStoredPeople(o, data) {
			console.log('stored poll', o);
			var me = this;
			me.getStoredList('poll').then((polls) => {
				polls.forEach(e => {
					if (o.encuesta_id < 0 && e.tmpId == Math.abs(o.encuesta_id) || e.id == o.encuesta_id) {
						delete e.synchronized;
						e.people = data;
						window._.db.transaction(['poll'], "readwrite").objectStore('poll').put(e);
					}
				});
			});
		},
		//data=sservr,o app
		onSyncPoll(dr, dl) {
			if (dr.people && dl.people) {
				for (var ki = 0; ki < dr.people.length; ki++) {
					for (var kj = 0; kj < dl.people.length; kj++) {
						if (dl.people[kj].tmpId == dr.people[ki].tmpId) {
							if (dr.people[ki].id) {
								dl.people[kj].id = dr.people[ki].id;
								dl.people[kj].synchronized = 1;
							}
							if (dr.people[ki].encuesta_id) {
								dl.people[kj].encuesta_id = dr.people[ki].encuesta_id;
							}
							console.log(dl.people[kj]);
							if (dl.tmpId)
								window._.db.transaction(['poll'], "readwrite").objectStore('poll').put(dl);
						}
					}
				}
			}
		},
		onSyncPeople(data, o) {
			var me = this;
			me.getStoredList('poll').then((polls) => {
				polls.forEach(e => {
					if (o.encuesta_id < 0 && e.tmpId == Math.abs(o.encuesta_id)
						|| e.id == o.encuesta_id) {
						e.people.forEach((e2, i) => {
							if (e2.tmpId == o.tmpId) e.people[i] = o;
						});
						window._.db.transaction(['poll'], "readwrite").objectStore('poll').put(e);
					}
				});
			});
		},
		logout() {
			this.session = null;
			localStorage.removeItem('session');
			//this.$router.push('/login');
			this.$router.push('/');
		},
		error(event, src) {
			if (!src)
				src = this.imgError;
			event.target.src = src;
			event.target.style.objectFit = 'contain';
		}

	},
	updated() {
		this.bindLinks();
		this.$emit('updated');
	},
	mounted() {
		this.bindLinks();
	}
})
</script>
<style>
@font-face {
	font-family: "PTSans";
	src: local("PTSans"),
		url(./cdn/fonts/ptsansnarrow-regular.ttf) format("truetype");
}

html:not(.hydrated) body {
	display: initial !important;
}

* {
	margin: 0px;
	padding: 0px;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 0px;
}

#page-header {
	border: 1px solid gray;
	min-height: 36px;
}

#page-header>* {
	min-height: 36px;
}

.primary {
	background-color: #0f62ac;
}

.v-widget-header,
.ui-state-default {
	border: 1px solid #a8a8a8;
	background: #c4c4c4 linear-gradient(top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
	background: #c4c4c4 -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.8)), to(rgba(255, 255, 255, 0)));
	background: #c4c4c4 -moz-linear-gradient(top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
	background: #c4c4c4 -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.8)), to(rgba(255, 255, 255, 0)));
	color: #333;
	font-weight: bold;
	text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
}

.v-button-text-icon-left i,
.v-button-text-icon-left svg,
.tre svg {
	margin-right: 10px;
}

.v-text-icon-left svg {
	margin-right: 10px;
}

.tre li a {
	border-bottom: 1px solid #5d4141;
	padding: 10px;
	font-weight: normal;
}

.tre ul {
	padding-left: 30px;
}

.tre i {
	margin-right: 10px;
	width: 26px;
	text-align: center;
}

#page-header>.v-header-button {
	min-height: 36px;
	padding: 0px 6px;
	display: inline-block;
}

.v-header-button {
	cursor: pointer;
}

.v-header-button:hover {
	background-color: #0e355a;
}

.v-header-button>svg {
	overflow: visible;
	height: 34px;
	width: 22px !important;
	color: white;
}

.ui-datatable thead th,
.ui-datatable tbody td,
.ui-datatable tfoot td,
.ui-datatable tfoot th {
	padding: 4px 5px;
	border-color: #ccd0d4;
	overflow: hidden;
	border: 1px solid #ccd0d4;
}

body {
	overflow-y: unset;
}

.v-popup-2 svg {
	left: 0px;
	top: 0px;
	margin: 10px;
	position: absolute;
}

.v-popup-2 li {
	position: relative;
	border: 1px solid #c1c1c1;
	cursor: pointer;
	padding: 7px 7px 7px 50px;
}

.v-popup-2 li:hover {
	font-weight: bold;
	background-color: #dae1e4;
}

.ui-dialog-content {
	background-color: white;
}

.v-popup-2 {
	list-style-type: none;
}

@media (min-width: 700px) {
	.v-mobil {
		visibility: hidden;
		display: none;
	}
}

@media (max-width: 700px) {
	.v-popup-2 {
		width: 100% !important;
	}

	.ui-datatable-header {
		visibility: hidden;
		display: none;
	}
}

.ic-42 svg {
	height: 36px;
	width: 36px;
	-webkit-filter: brightness(10);
	filter: brightness(10);
	background-size: 34px 34px;
	background-position: 2px 2px;
	background-repeat: no-repeat;
}

.ui-user>a {
	display: inline-block;
	padding: 5px;
}

.ui-user {
	min-height: 0px !important;
	float: right;
	color: white;
	padding: 7px 0px 7px 7px;
	margin: 0px;
}

.x-menu-list {
	z-index: 1005;
	width: -webkit-fill-available;
}

.x-menu-list>li>a {
	padding: 10px 20px;
	display: block !important;
	width: unset !important;
}

.x-menu-bar svg.fa-bars {
	padding: 5px !important;
}

.tre ul>li a>svg {
	width: 24px;
	height: 24px;
}

.ui-panel-titlebar {
	border-width: 0px;
}

@media (max-width: 700px) {
	* {
		font-size: 103%;
	}
}

.v-head-cloned {
	display-: none;
}

.v-menubar>li>a {
	padding: 10px;
}

.loading {
	background: url(./cdn/images/loading.svg) no-repeat top center;
}

.ui-panel>.v-widget-content>form>center:last-child {
	position: sticky;
	bottom: 0;
	background-color: #0f62ac;
	border-top: 1px solid gray;
	padding: 10px;
}

input {
	color: black;
}

.v-table th input {
	color: black;
}

.v-table th input:disabled {
	background-color: #dadada !important;
	opacity: 0.5;
}
</style>