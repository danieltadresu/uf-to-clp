<template>
  <div id="components-modal-demo-position">
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="amount">Amount</label>
        <input type="number" id="amount" v-model.trim="amount" />
      </div>
      <div class="form-control">
        <label for="date">Date</label>
        <input type="text" id="date" v-model.trim="date" />
      </div>
      <p class="errors" v-if="!formIsValid">
        Please enter a valid amount and a valid date format (dd-mm-yyyy).
      </p>
      <a-button key="0" v-on:click="submitForm()" type="primary">
        Get Conversion
      </a-button>
      <div class="alert-container">
        <a-alert
          v-if="getClp && !loading"
          message="Conversion Amount"
          :description="getClp"
          type="info"
          show-icon
        />
        <a-spin v-if="loading">
          <a-icon
            v:slot:indicator
            type="loading"
            style="font-size: 24px"
            spin
          />
        </a-spin>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Convert',
  data() {
    return {
      amount: '',
      date: '',
      formIsValid: true,
      clp: '',
      loading: false,
    };
  },
  computed: {
    getPayload() {
      return {
        amount: this.amount,
        date: this.date,
      };
    },
    getClp() {
      return this.clp;
    },
  },
  methods: {
    async submitForm() {
      this.loading = true;
      const { amount, date } = this.getPayload;
      const response = await fetch(
        `http://localhost:80/conversion/${date}/${amount}`
      );
      const { data } = await response.json();
      console.log('[ data ] > ', data);
      this.clp = data.conversion;
      console.log('[ this.clp ] > ', this.clp);
      this.loading = false;
    },
  },
};
</script>
<style scoped>
form {
  max-width: 500px;
  margin: 1rem auto 1rem auto;
}
.alert-container {
  margin: 1rem 0;
}
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
  color: #ccc;
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
