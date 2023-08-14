<template>
	<v-form header="Cuestionario de Condiciones de Vida" style="position:relative;" 
		action="/admin/poll">
		<v-table
            :selectable="true"
            :scrollable="true"
            rowKey="id"
            :pagination="50"
            src="/api/obresec/crime" >
            <template v-slot:header="">
                <v-button value="#{bundle.Create}" v-if="perms.OBRESEC_REGISTER_CRIME" icon="fa-plus" class="on" v-on:click.prevent="create"/>
                <v-button value="#{bundle.Edit}" v-if="perms.OBRESEC_REGISTER_CRIME" icon="fa-pen" 
                          v-on:click.prevent="edit" 
                          :disabled="!canAdmin(rowSelected)"/>
                <v-button value="#{bundle.Delete}" v-if="perms.OBRESEC_REGISTER_CRIME" icon="fa-trash" v-on:click.prevent="destroy" 
                          :disabled="!canAdmin(rowSelected)"/>
                <v-button title="#{bundle.Refresh}" icon="fa-sync" v-on:click.prevent="refresh"/>
                <v-button icon="fa-download" value="#{'Reportes'}" v-on:click.prevent="report"/>
            </template>
            <template v-slot:default="{row,index}">
                <td header="#" width="28" class="center" :title="row.id">
                    {{pad(index+1,3)}}
                </td>
                <td width="50" class="center" header="&hearts;">
                    <v-filter>
                        <v-select multiple="true" v-model="filters.autority">
                            <v-options :data="autority" value-field="id" display-field="name"/>
                        </v-select>
                    </v-filter>
                    <i v-if="row.ext.own" class="fa fa-heart" />
                </td>
                <td width="80" class="center" label="#{bundle.Fecha}">
                    <v-filter>
                        <v-filter-calendar v-model="filters.fecha" icon="fa-calendar"/>
                    </v-filter>
                    {{row.fecha|date('date')}}
                </td>
                <td width="200" label="#{bundle.Type}">
                    <v-filter>
                        <v-select v-model="filters.crimeType" multiple="true">
                            <v-options url="/admin/obresec/api/crime-type/0/0" value-field="id" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{row.crimeType?row.crimeType.name:''}}
                </td>
                <td width="180" label="#{bundle.Province}">
                    <v-filter>
                        <v-select v-model="filters.province" v-on:input="$refs.districtSelect.load({provinceId:filters.province})">
                            <option value="">#{bundle.SelectOneMessage}</option>
                            <v-options url="/admin/directory/api/province/0/0?regionId=2" value-field="code" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{row.ext.district[3]?row.ext.district[3]:'---'}}
                </td>
                <td width="180" label="#{bundle.District}">
                    <v-filter>
                        <v-select ref="districtSelect" v-model="filters.district" :disabled="!filters.province" >
                            <option value="">#{bundle.SelectOneMessage}</option>
                            <v-options url="/admin/directory/api/district/0/0" value-field="code" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{row.ext.district[1]?row.ext.district[1]:row.districtId}}
                </td>
                <td width="360" label="#{bundle.Description}">
                    <v-filter>
                        <input v-model="filters.description"/>
                    </v-filter>
                    {{row.description}}
                </td>
                <td width="60" class="center" label="#{bundle.Victim} #{bundle.Sex}">
                    <v-filter>
                        <v-select multiple="true" v-model="filters.victimSex">
                            <v-options :data="sex" value-field="id" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{row.victimSex}}
                </td>
                <td width="60" class="center" label="#{bundle.Victim} #{bundle.Age}">
                    <v-filter>
                        <input v-model="filters.victimAge"/>
                    </v-filter>
                    {{row.victimAge}}
                </td>
                <td width="100" label="#{bundle.Victim} #{bundle.Country}">
                    <v-filter>
                        <input v-model="filters.victimCountry"/>
                    </v-filter>
                    {{row.victimCountry}}
                </td>
                <td width="60" class="center" label="#{bundle.Criminal} #{bundle.Sex}">
                    <v-filter>
                        <v-select multiple="true" v-model="filters.criminalSex">
                            <v-options :data="sex" value-field="id" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{row.criminalSex}}
                </td>
                <td width="60" class="center" label="#{bundle.Criminal} #{bundle.Age}">
                    <v-filter>
                        <input v-model="filters.criminalAge"/>
                    </v-filter>
                    {{row.criminalAge}}
                </td>
                <td width="100" label="#{bundle.Criminal} #{bundle.Country}">
                    <v-filter>
                        <input v-model="filters.criminalCountry"/>
                    </v-filter>
                    {{row.criminalCountry}}
                </td>
                <td width="90" class="center" label="#{bundle.Coordinates}">
                    <v-filter>
                        <v-select multiple="true" v-model="filters.coordinate">
                            <v-options :data="coordinate" value-field="id" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{0>row.lat&&0>row.lon?'SI':''}}
                </td>
                <td width="80" class="center" label="#{bundle.RegistrationDate}">
                    <v-filter>
                        <v-filter-calendar v-model="filters.fechaReg" icon="fa-calendar"/>
                    </v-filter>
                    {{row.fechaReg|date}}
                </td>
                <td width="80" class="center" label="#{bundle.User}">
                    <v-filter>
                        <input v-model="filters.usuario"/>
                    </v-filter>
                    U:{{row.uid}}<br/>
                    P:{{row.directoryId}}<br/>
                    D:{{row.dependencyId}}<br/>
                </td>
            </template>
        </v-table>
	</v-form>
</template>
<script>
	export default window.ui({
		props:['src'],
		computed:{
			filter(){
				console.log(window.app.session.rol);
				var p={},me=this;
				if(me.query){
					p.query=me.query;
				}
				return p;
			}
		},
		data(){return {rowSelectedCount2:0,page:0,data:[],mode:0,query:null}},
		updated(){
			window.app.bindLinks(this.$el);
		},
		mounted(){
			var me=this;
			me.changeRoute();
			me.filters.poll=me.app.poll;
			me.$on('sync',function(dr,dl){
				if(dr.people&&dl.people){
					for(var ki=0;ki<dr.people.length;ki++){
						for(var kj=0;kj<dl.people.length;kj++){
							if(dl.people[kj].tmpId==dr.people[ki].tmpId){
								if(dr.people[ki].id){
									dl.people[kj].id=dr.people[ki].id;
									dl.people[kj].synchronized=1;
								}
								if(dr.people[ki].encuesta_id){
									dl.people[kj].encuesta_id=dr.people[ki].encuesta_id;
								}
								console.log(dl.people[kj]);
							}
						}
					}
				}
			});
		},
		methods:{
			rss(e){
				e=e.selection;
				this.rowSelectedCount2=e?e.length:0;
			},
			changeRoute(){
				this.resize();
			}
		}
	});
</script>
<style scope>
	img.error{
		padding: 40px !important;
		width: calc(100% - 80px) !important;
		background-color: transparent;
	}
	a{
		display:inline-block;
	}
	.controls a:not(:last-child){
		display:inline-block;
		margin-right:0px;
	}
	.store-list{
		background-color: rgb(240, 240, 240);padding: 20px;
	}
	.store{
		padding: 0px;
		background-color: white;
		position:relative;
		width: calc(100% - 0px);
	}
	.store:not(:last-child){
		margin-bottom:20px;
	}
	.store img{
		width: 60%;
		margin: 0 auto !important;
		border: 0;
	}
	.store-info .controls{
		position:absolute;
		top:0px;
		right:-10px;
	}
	.v-no-results {
		background: white !important;
	}
</style>