<template>
  <ion-content :scroll-events="true">
    <v-form :header="$t(o.id?'Edit':'Create')+ ' '+$t('CrimeCategory')"
      action="/admin/obresec/api/crime/category">
      <div class="v-form" style="padding: 10px !important;">
        <label>{{$t('Name')}}:</label>
        <input required="true" v-model="o.name" />
      </div>
      <center>
        <v-button :value="$t('Save')" icon="fa-save" v-on:click.prevent="save" />
        <v-button :value="$t('Cancel')" icon="fa-ban" v-on:click="close" />
      </center>
    </v-form>
  </ion-content>
</template>
<script>
var { _, axios } = window;
export default _.ui({
  props: ['id'],
  data() { return { o: {} }; },
  created() {
    var me = this;
    if (me.id)
      axios.get('/api/obresec/crime/category/' + me.id).then((r) => {
        me.o = r.data;
      });
  }
});
</script>
<style scoped>
/deep/ .v-dialog-content>form {
  display: flex;
  flex-direction: column;
}

/deep/ .v-dialog-content>form>div {
  padding: 0px !important;
}
</style>