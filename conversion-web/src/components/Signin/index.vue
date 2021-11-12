<template>
  <div id="components-modal-demo-position">
    <a-modal
      title="Signin"
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
        <div class="form-control">
          <label for="role">Role</label>
          <input type="text" id="role" v-model.trim="role" />
        </div>
        <p class="errors" v-if="!formIsValid">
          Please enter a valid email, non-empty password an a valid role. It can
          be ADMIN or USER.
        </p>
      </form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  emits: ['on-signin'],
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
      role: '',
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
      this.$emit('on-signin', !this.isVisible);
    },
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password === '' ||
        !['ADMIN', 'admin', 'USER', 'user'].includes(this.role)
      ) {
        this.formIsValid = false;
        return;
      }
      const payload = {
        email: this.email,
        password: this.password,
        role: this.role,
      };
      const responseData = await fetch(`http://localhost:80/auth`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const { data, code } = await responseData.json();
      console.log(`code`, code);
      if (code === 200) {
        this.$emit('on-signin', !this.isVisible);
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
