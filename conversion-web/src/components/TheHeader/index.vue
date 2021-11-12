<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Conversion"
      sub-title="Web APP for getting the UF value on CLP."
    >
      <template v-slot:extra>
        <!-- Buttons when is logged OUT -->
        <a-button v-if="!auth.role" key="0" v-on:click="onLogin(true)">
          Login
        </a-button>
        <a-button
          v-if="!auth.role"
          key="1"
          v-on:click="onSignin(true)"
          type="primary"
        >
          Create your account
        </a-button>
        <!-- End Buttons when is logged OUT -->

        <!-- Buttons is logged IN -->
        <a-button v-if="auth.role" key="2"> Get conversion. </a-button>
        <a-button v-if="roleAdminAccess" key="3">
          Dowload Excel Report. (Pending)
        </a-button>
        <a-button
          v-if="auth.role"
          key="4"
          v-on:click="onLogout()"
          type="primary"
        >
          Logout
        </a-button>
        <!-- End Buttons is logged IN -->
      </template>
    </a-page-header>
    <br />
  </div>
</template>

<script>
import { ADMIN } from '../../utils/const/roles';

export default {
  name: 'TheHeader',
  emits: ['on-login', 'on-signin', 'on-logout'],
  props: {
    auth: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isSignedIn: false,
      isLoggedIn: false,
    };
  },
  computed: {
    roleAdminAccess() {
      return this.auth.role === ADMIN;
    },
  },
  methods: {
    onLogin(value) {
      this.isLoggedIn = value;
      this.$emit('on-login', value);
    },
    onSignin(value) {
      this.$emit('on-signin', value);
    },
    onLogout() {
      this.$emit('on-logout');
    },
  },
};
</script>

<style>
tr:last-child td {
  padding-bottom: 0;
}
</style>
