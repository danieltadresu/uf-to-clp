<template>
  <div>
    <the-header
      @on-login="onLogin"
      @on-signin="onSignin"
      @on-logout="onLogout"
      :auth="auth"
    />
    <login @on-auth="onAuth" @on-login="onLogin" :visible="visible.login" />
    <signin @on-signin="onSignin" :visible="visible.signin" />
    <convert v-if="roleAccess" />
  </div>
</template>

<script>
import { TheHeader, Login, Signin, Convert } from './components';
import { ADMIN, USER } from './utils/const/roles';

export default {
  name: 'App',
  components: {
    TheHeader,
    Login,
    Signin,
    Convert,
  },
  data() {
    return {
      visible: {
        signin: false,
        login: false,
      },
      auth: {
        role: null,
      },
    };
  },
  computed: {
    roleAccess() {
      return [ADMIN, USER].includes(this.auth.role);
    },
  },
  methods: {
    onLogin(data) {
      this.visible = { ...this.visible, login: data };
    },
    onSignin(data) {
      this.visible = { ...this.visible, signin: data };
    },
    onAuth(data) {
      console.log('[ App.vue ] > ', data);
      this.auth.role = data;
    },
    onLogout() {
      console.log('[ onLogout App.js ]');
      this.auth.role = null;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
