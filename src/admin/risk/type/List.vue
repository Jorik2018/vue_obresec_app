<template>
	<ion-content :scroll-events="true">
		<v-form header="Tipos Riesgo" style="position:relative;" action="/admin/obresec/risk/type">
			<v-table :scrollable="true" :pagination="50" @updated="tableUpdated" src="/api/obresec/risk/type">
				<template v-slot:header="">
					<v-button :value="$t('Create')" v-if="can(perms.OBRESEC_REGISTER_CRIME)" icon="fa-plus" class="on"
						@click.prevent="create" />
					<v-button :value="$t('Edit')" v-if="can(perms.OBRESEC_REGISTER_CRIME)" icon="fa-pen"
						@click.prevent="edit" :disabled="!can()" />
					<v-button :value="$t('Delete')" vif="perms.OBRESEC_REGISTER_CRIME" icon="fa-trash"
						@click.prevent="destroy" :disabled="!can()" />
					<v-button :title="$t('Refresh')" icon="fa-sync" @click.prevent="refresh" />
				</template>
				<template v-slot="{ row, index }">
					<td width="60" header="#" class="center">
						{{ pad(index + 1, 3) }}
					</td>
					<td width="300" :header="$t('Name')">
						{{ row.name }}
					</td>
					<td width="60" :header="$t('Symbol')" :title="row.shape" class="center">
						<span style="width:20px;display: inline-block" :key="row.shape + '-' + row.color"
							:style="{ color: '#' + row.color, backgroundColor: '#' + row.color }" class="shape"
							:data-symbol="row.shape" />
					</td>
				</template>
			</v-table>
		</v-form></ion-content>
</template>
<script>
import ShapeDrawer from "../../../cdn/shapes";
export default window.ui({
	data() { return { rowSelectedCount2: 0, page: 0, data: [], mode: 0, query: null, filter: { coordinate: null, autority: null, sex: null } } },
	mounted() {
		let me = this;
		me.perms.OBRESEC_REGISTER_CRIME = 1;
		me.changeRoute();
		me.filters.poll = me.app.poll;
		me.$on('sync', function (dr, dl) {
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
						}
					}
				}
			}
		});
	},
	methods: {
		rewrite(url) {
			return '/admin' + url;
		},
		changeRoute() {
			this.resize();
		},
		can(r) {
			if (!r) {
				var me = this, perms = me.perms, u = me.user;
				r = this.getSelected()[0];
				return r && (1 || perms.OBRESEC_ADMIN_CRIME || r.uid == u.uid);
			} else {
				return 1;
			}
		},
		tableUpdated(t) {
			ShapeDrawer(t.$el.querySelectorAll('.v-datatable-data .shape:not(._)'));
		}
	}
});
</script>
<style scope>
img.error {
	padding: 40px !important;
	width: calc(100% - 80px) !important;
	background-color: transparent;
}

a {
	display: inline-block;
}

.controls a:not(:last-child) {
	display: inline-block;
	margin-right: 0px;
}

.store-list {
	background-color: rgb(240, 240, 240);
	padding: 20px;
}

.store {
	padding: 0px;
	background-color: white;
	position: relative;
	width: calc(100% - 0px);
}

.store:not(:last-child) {
	margin-bottom: 20px;
}

.store img {
	width: 60%;
	margin: 0 auto !important;
	border: 0;
}

.store-info .controls {
	position: absolute;
	top: 0px;
	right: -10px;
}

.v-no-results {
	background: white !important;
}</style>