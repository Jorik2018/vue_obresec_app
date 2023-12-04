<template>
	<ion-content :scroll-events="true">
		<v-form header="Riesgos">
			<v-table store="poll" row-style-class="row.synchronized?'green':(row.tmpId>0?'yellow':'')"
				src="/api/obresec/risk" pagination="50" scrollable="true" :filters="filters">
				<template v-slot:header="">
					<v-button :value="$t('Create')" icon="fa-plus" class="on" @click.prevent="create"></v-button>
					<v-button :value="$t('Edit')" v-if="1 || can(perms.DESARROLLO_SOCIAL_REGISTER_SIVICO)" icon="fa-pen"
						@click.prevent="edit" :disabled="!rowSelectedCount"></v-button>
					<v-button :value="$t('Delete')" icon="fa-trash" @click.prevent="destroy"
						:disabled="!rowSelectedCount"></v-button>
					<v-button :title="$t('Refresh')" icon="fa-sync" @click.prevent="refresh"></v-button>
				</template>
				<template v-slot:default="{ row , index}">
					<td header="#" width="50" class="center" :title="row.id">
						{{ pad(index + 1, 3) }}
					</td>
					<td width="200" :header="$t('Type')">
						<v-filter>
							<input v-model="filters.type" />
						</v-filter>
						{{ row.type ? row.type.name : '' }}
					</td>
					<td width="180" :header="$t('Province')">
						<v-filter>
							<v-select v-model="filters.province"
								@input="$refs.districtSelect.load({ provinceId: filters.province })">
								<option value="">{{$t('SelectOneMessage') }}</option>
								<v-options url="/admin/directory/api/province/0/0?regionId=2" value-field="code"
									display-field="name" />
							</v-select>
						</v-filter>
						{{ row.ext ? row.ext[3] : '---' }}
					</td>
					<td width="180" :header="$t('District')">
						<v-filter>
							<v-select ref="districtSelect" v-model="filters.district" :disabled="!filters.province">
								<option value="">{{$t('SelectOneMessage') }}</option>
								<v-options url="/admin/directory/api/district/0/0" value-field="code"
									display-field="name" />
							</v-select>
						</v-filter>
						{{ row.ext ? row.ext[1] : row.districtId }}
					</td>
					<td width="200" :header="$t('Description')">
						<v-filter>
							<input v-model="filters.description" />
						</v-filter>
						{{ row.description }}
					</td>

					<td width="120" class="center" :header="$t('From')">
						<v-filter>
							<input v-model="filters.fechaIni" />
						</v-filter>
						{{ row.fechaIni | date }}
					</td>
					<td width="120" class="center" :header="$t('To')">
						<v-filter>
							<input v-model="filters.fechaFin" />
						</v-filter>
						{{ row.fechaFin | date }}
					</td>
					<td width="80" class="center" :header="$t('Status')">
						<v-filter>
							<input v-model="filters.status" />
						</v-filter>
						{{ row.status ? 'ACTIVO' : 'TERMINADO' }}
					</td>
					<td width="120" class="center" :header="$t('Coordinates')">
						<v-filter>
							<v-select multiple="true" v-model="filters.coordinate">
								<v-options :data="coordinate" value-field="id" display-field="name" />
							</v-select>
						</v-filter>
						{{ 0 > row.lat && 0 > row.lon ? 'SI' : '' }}
					</td>
					<td width="120" class="center" :header="$t('RegisterDate')">
						<v-filter>
							<input v-model="filters.fechaReg" />
						</v-filter>
						{{ row.fechaReg | date }}
					</td>
					<td width="80" class="center" :header="$t('User')">
						<v-filter>
							<input v-model="filters.usuario" />
						</v-filter>
						U:{{ row.userId }}<br />
						P:{{ row.directoryId }}<br />
						D:{{ row.dependencyId }}<br />
					</td>
				</template>
			</v-table>
		</v-form>
	</ion-content>
</template>
<script>
export default window.ui({
	props: ['src'],
	computed: {
		filter() {
			console.log(window.app.session.rol);
			var p = {}, me = this;
			if (me.query) {
				p.query = me.query;
			}
			return p;
		}
	},
	data(){return {coordinate: [{id: 'S', name: 'SI'}, {id: 'N', name: 'NO'}], sex:[{id:'M',name:'MASCULINO'},{id:'F',name:'FEMENINO'}],autority:[{id:'P',name:'PROPIOS'},{id:'O',name:'DE OTROS'}]};},
            
	updated() {
		window.app.bindLinks(this.$el);
	},
	mounted() {
		var me = this;
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
		changeRoute() {
			this.resize();
		},
		rewrite(url){
            return '/admin'+url;
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