<template>
  <div>
    <div class="theme-inner-banner">
      <div class="opacity">
        <div class="container">
          <h2>Sign In</h2>
          <ul>
            <li>
              <a class="tran3s" href="http://khair-elkhalij.com">
                Home
              </a>
            </li>
            <li>/</li>
            <li>Sign In</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container sign-in-page theme-contact-page-styleOne">
      <div class="sign-in-page__form wow fadeInLeft">
        <div class="khalij-form">
          <h4>Sign in</h4>
          <form class="form-validation" autocomplete="off" @submit.prevent>
            <div class="single-input">
              <input type="text" placeholder="Your phone number*" name="phone-number" v-model="pm.signInForm.phoneNumber.value">
            </div>
            <button class="button-one ch-p-bg-color" @click="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SignInPM from '@/presentation-models/SignInPM';

export default Vue.extend({
  name: 'SignIn',
  data() {
    return {
      pm: new SignInPM(),
    };
  },
  methods: {
    async submit() {
      const isFormValid = this.pm.isFormValid();
      if (isFormValid) {
        const signed = await this.pm.signIn();
        if (signed) {
          await this.$router.push('/');
        }
      }
    },
  },
});
</script>

<style lang="scss">
  .sign-in-page {
    margin-bottom: 50px;
    display: flex;
    justify-content: center;

    &__form {
      width: 600px;
    }
  }
</style>
