<template>
  <div class="login-card">
    <div style="text-align:center">
      <img src="https://cdn.discordapp.com/attachments/997060428385484880/1044766467331215390/232323.PNG" alt="">
    </div>
    <div class="login-card-div mt-3">
      <b-form @submit.prevent="logIn()">
        <div class="pt-4"></div>
        <div class="login-card-div-input">
          <b-form-group id="input-group-1" label="Your ID: " label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="payload.username"
              type="text"
              placeholder="Enter your ID"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Password: " label-for="input-2">
            <b-form-input
              id="input-2"
              type="password"
              placeholder="Enter your Password"
              v-model="payload.password"
              required
              ></b-form-input>
            </b-form-group>
            <div class="mt-5 pt-4"></div>
            <div>
              <b-button style="width:100%" type="submit" variant="primary">LOGIN</b-button>
            </div>
        </div>
      </b-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      payload: {
        username: '',
        password: '',
      }
    }
  },
  computed: {
    isLogin() {
      return this.$store.gatters.isLogin
    },
  },
  created() {
    if (this.isLogin) {
      alert('로그아웃 후 진행해주세요!')
      this.$router.back()
    }
  },
  methods: {
    logIn() {
      const payload = this.payload
      this.$store.dispatch('logIn', payload)
      console.log('로그인페이지', payload)
    },
  }
}
</script>

<style>
.login-card {
  margin: 0 auto;
  margin-top: 100px;
  height: 100vh;
}
.login-card-div {
  padding: 0 auto;
  margin: 0 auto;
  min-height: 200px;
  min-width: 500px;
  height: 300px;
  width: 600px;
  background-color: #D9D9D9;
  border-radius: 10px;
}
.login-card-div-input {
  margin: 0 auto;
  min-height: 300px;
  min-width: 400px;
  height: 350px;
  width: 550px;
}
</style>