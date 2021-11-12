<template>
  <div id="components-modal-demo-position">
    <a-modal
      title="Login"
      :dialog-style="{ top: '20px' }"
      :visible="isVisible"
      @ok="submitForm"
      @cancel="handleOk"
    >
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Your e-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Your Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p class="errors" v-if="!formIsValid">
          Please enter a valid email and non-empty password.
        </p>
      </form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Login',
  emits: ['on-login', 'on-auth'],
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isVisible: this.visible,
      email: '',
      password: '',
      formIsValid: true,
    };
  },
  watch: {
    visible() {
      this.isVisible = this.visible;
    },
  },
  methods: {
    handleOk() {
      this.$emit('on-login', !this.isVisible);
    },
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password === ''
      ) {
        this.formIsValid = false;
        return;
      }
      const response = await fetch(
        `http://localhost:80/auth/${this.email}/${this.password}`
      );
      const { data } = await response.json();
      console.log('[ data ] > ', data);
      if (data) {
        this.$emit('on-login', !this.isVisible);
        this.$emit('on-auth', data.role);
      } else {
        console.log(data);
      }
    },
  },
};
</script>
<style scoped>
form {
  margin: 1rem;
}
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}
input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}
input:focus,
textarea:focus {
  border-color: #1890ff;
  outline: none;
}
.errors {
  font-weight: bold;
  color: red;
}
</style>
