<template>
  <div style="background-color: white; height: 100%; overflow: auto">
    <img
      src="@/fs/images/fondo-login.svg"
      width="100%"
      style="position: absolute; object-fit: cover; height: 600px; bottom: 0px"
    />
    <div id="logoiniciosesion" class="center">
      <img
        height="120"
        class="ui-banner-login"
        src="@/fs/images/logo-final.svg"
      />
    </div>
    <form id="LoginForm">
      <div
        style="margin-top: 20px; padding: 30px; padding-top: 80px"
        class="LoginForm v-form"
      >
        <div class="v-input-label" style="margin-bottom: 30px">
          <label position="floating" style="color: white; border: 0px"
            >Correo</label
          >
          <input
            class="input-login"
            v-on:focus="$event.target.parentNode.classList.add('v-focus')"
            v-on:focusout="focusout"
            type="text"
            v-model="o.name"
            required
          />
        </div>
        <div class="center">
          <v-button
            expand="block"
            style="
              font-size: 20px !important;
              margin-bottom: 20px;
              color: #3a62a8;
              background: #fbe501;
              border-radius: 1px;
              border-width: 0px;
            "
            v-on:click.prevent="password"
            v-bind:disabled="!o.name"
            value="RECUPERAR CONTRASEÑA"
          />
        </div>
        <div style="margin-bottom: 20px; color: white">
          Si tu correo es correcto una nueva clave será enviada a tu bandeja,
          luego podrás cambiarla.
        </div>
        <a href="/login" style="margin-bottom: 10px">Iniciar Sessión</a>
        <a href="/register">Registrate</a>
      </div>
    </form>
  </div>
</template>
<script>
import { IonContent } from "@ionic/vue";
var axios = window.axios;
var _ = window._;
export default window.ui({
  components: { IonContent },
  data() {
    return { o: { name: null } };
  },
  update() {
    window.app.bindLinks(this.$el);
  },
  methods: {
    focusout(e) {
      if (!e.target.value) {
        e.target.parentNode.classList.remove("v-focus");
      }
    },
    password() {
      var me = this;
      if (me.validate(this.$el)) {
        axios
          .get("/apishami/api/usuarios/enviarcorreo/" + me.o.name)
          .then((response) => {
            _.MsgBox(response.data.msg);
          });
      }
    },
  },
});
</script>
<style scoped>
.content-login {
  background-color: white;
  position: relative;
}
.button-native {
  background-color: #fbe501;
}
h3 {
  margin: 40px 0 0;
}
a {
  color: #fbe501;
}
.v-primary-dark i {
  margin-right: 10px;
}
html {
  height: 100%;
}
body {
  padding: 20px;
  background-image: linear-gradient(#007bff, #000000);
  min-height: calc(100% - 40px);
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
a {
  display: block;
  text-align: center;
}
a:hover {
  color: white;
}
.v-button {
  border-radius: 10px;
}
.inner {
  border-radius: 10px;
  position: relative;
}
label {
  display: inline-block;
  margin-bottom: 0px;
  font-size: 20px;
}

#logoiniciosesion {
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  padding-top: 50px;
  padding-bottom: 50px;
}
ion-label {
  font-size: 28px;
  font-weight: bolder !important;
  font-family: PTSans !important;
  margin-bottom: 10px;
}
.enlaces {
  margin-right: 40px;
  margin-left: 40px;
  background-color: #e9bc27;
}
.LoginForm {
  position: absolute;
  bottom: 0px;
  width: -webkit-fill-available;
}
.LoginForm > ion-item,
input:required:empty,
.native-input.sc-ion-input-md {
  --background: transparent !important;
  background-color: transparent !important;
}
.v-input-label {
  position: relative;
  padding-top: 22px;
}
.v-input-label.v-focus > label {
  color: white;
  font-size: 15px;
  top: 0px;
}
.v-input-label > label {
  transition-property: font-size, top;
  transition-duration: 0.5s;
  position: absolute;
  color: white;
  top: 20px;
  margin-left: 5px;
}
.v-input-label > input {
  color: white;
  text-align: center;
  border-radius: 0px !important;
  border-width: 0px 0px 1px;
}
</style>
