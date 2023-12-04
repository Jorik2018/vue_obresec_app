<template>
	<ion-content :scroll-events="true">
    <v-form header="Delitos" style="position:relative;" 
		action="/admin/obresec/crime">
		<v-table
            :scrollable="true"
            :pagination="50"
            src="/api/obresec/crime" >
            <template v-slot:header="">
                <v-button :value="$t('Create')" v-if="can(perms.OBRESEC_REGISTER_CRIME)" icon="fa-plus" class="on" v-on:click.prevent="create"/>
                <v-button :value="$t('Edit')" v-if="can(perms.OBRESEC_REGISTER_CRIME)" icon="fa-pen" 
                          v-on:click.prevent="edit" 
                          :disabled="!can()"/>
                <v-button :value="$t('Delete')" vif="perms.OBRESEC_REGISTER_CRIME" icon="fa-trash" v-on:click.prevent="destroy" 
                          :disabled="!can()"/>
                <v-button :title="$t('Refresh')" icon="fa-sync" v-on:click.prevent="refresh"/>
                <v-button icon="fa-download" :value="$t('Report')" v-on:click.prevent="report"/>
            </template>
            <template v-slot="{row,index}">
                <td header="#" width="42" class="center" :title="row.id">
                    {{pad(index+1,3)}}
                </td>
                <td width="50" class="center" header="&hearts;">
                    <v-filter>
                        <v-select multiple="true" v-model="filters.autority">
                            <v-options :data="autority" value-field="id" display-field="name"/>
                        </v-select>
                    </v-filter>
                    <i vif="row.ext.own" class="fa fa-heart" />
                </td>
                <td width="120" class="center" :header="$t('Date')">
                    <v-filter>
                        <v-filter-calendar v-model="filters.fecha" icon="fa-calendar"/>
                    </v-filter>
                    {{row.fecha|date('date')}}
                </td>
                <td width="200" :header="$t('Type')">
                    <v-filter>
                        <v-select v-model="filters.crimeType" multiple="true">
                            <v-options url="/admin/obresec/api/crime-type/0/0" value-field="id" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{row.crimeType?row.crimeType.name:''}}
                </td>
                <td width="180" :header="$t('Province')">
                    <v-filter>
                        <v-select v-model="filters.province" v-on:input="$refs.districtSelect.load({provinceId:filters.province})" multiple="true">
                            <v-options url="/admin/directory/api/province/0/0?regionId=2" value-field="code" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{row.ext&&row.ext.district&&row.ext.district[3]}}

                </td>
                <td width="180" :header="$t('District')">
                    <v-filter>
                        <v-select ref="districtSelect" v-model="filters.district" :disabled="!filters.province" >
                            <option value="">#{bundle.SelectOneMessage}</option>
                            <v-options url="/admin/directory/api/district/0/0" value-field="code" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{row.ext&&row.ext.district&&row.ext.district[1]}}
                </td>
                <td width="360" :header="$t('Description')">
                    <v-filter>
                        <input v-model="filters.description"/>
                    </v-filter>
                    {{row.description}}
                </td>
                <td width="80" class="center" :header="`${$t('Victim')} ${$t('Sex')}`">
                    <v-filter>
                        <v-select multiple="true" v-model="filters.victimSex">
                            <v-options :data="sex" value-field="id" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{row.victimSex}}
                </td>
                <td width="80" class="center" :header="`${$t('Victim')} ${$t('Age')}`">
                    <v-filter>
                        <input v-model="filters.victimAge"/>
                    </v-filter>
                    {{row.victimAge}}
                </td>
                <td width="100" :header="`${$t('Victim')} ${$t('Country')}`">
                    <v-filter>
                        <input v-model="filters.victimCountry"/>
                    </v-filter>
                    {{row.victimCountry}}
                </td>
                <td width="80" class="center" :header="`${$t('Criminal')} ${$t('Sex')}`">
                    <v-filter>
                        <v-select multiple="true" v-model="filters.criminalSex">
                            <v-options :data="sex" value-field="id" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{row.criminalSex}}
                </td>
                <td width="80" class="center" :header="`${$t('Criminal')} ${$t('Age')}`">
                    <v-filter>
                        <input v-model="filters.criminalAge"/>
                    </v-filter>
                    {{row.criminalAge}}
                </td>
                <td width="100" :header="`${$t('Criminal')} ${$t('Country')}`">
                    <v-filter>
                        <input v-model="filters.criminalCountry"/>
                    </v-filter>
                    {{row.criminalCountry}}
                </td>
                <td width="90" class="center" :header:="$t('Coordinates')">
                    <v-filter>
                        <v-select multiple="true" v-model="filters.coordinate">
                            <v-options :data="coordinate" value-field="id" display-field="name"/>
                        </v-select>
                    </v-filter>
                    {{0>row.lat&&0>row.lon?'SI':''}}
                </td>
                <td width="120" class="center" :header="$t('RegistrationDate')">
                    <v-filter>
                        <v-filter-calendar v-model="filters.fechaReg" icon="fa-calendar"/>
                    </v-filter>
                    {{row.fechaReg|date}}
                </td>
                <td width="80" class="center" :header="$t('User')">
                    <v-filter>
                        <input v-model="filters.usuario"/>
                    </v-filter>
                    U:{{row.uid}}<br/>
                    P:{{row.directoryId}}<br/>
                    D:{{row.dependencyId}}<br/>
                </td>
            </template>
        </v-table>
	</v-form></ion-content>
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
		data(){return {rowSelectedCount2:0,page:0,data:[],mode:0,query:null,filter:{coordinate:null,autority:null,sex:null}}},
		mounted(){
			let me=this;
            me.perms.OBRESEC_REGISTER_CRIME=1;
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
            rewrite(url){
                return '/admin'+url;
            },
			changeRoute(){
				this.resize();
			},
            can(r){
                if(!r){
                    var me=this,perms=me.perms,u=me.user;
                    r=this.getSelected()[0];
                    return r&&(1||perms.OBRESEC_ADMIN_CRIME||r.uid==u.uid);
                }else{
                    return 1;
                }
            },
            report(){
                this.open("/admin/obresec/report/crime");
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