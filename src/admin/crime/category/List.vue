<template>
	<ion-content :scroll-events="true">
    <v-form header="Categorias Delito" style="position:relative;" 
		action="/admin/obresec/crime/category">
		<v-table
            :scrollable="true"
            :pagination="50"
            src="/api/obresec/crime/category" >
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
                <td width="60" label="#" class="center">
                    {{pad(index+1,3)}}
                </td>
                <td width="300" :label="$t('Name')">
                    {{row.name}}
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