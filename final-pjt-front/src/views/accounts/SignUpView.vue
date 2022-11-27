<template>
  <div>
    <div class="signup-card">
      <div style="text-align:center">
        <img src="@/assets/PICME3.png" alt="">
      </div>
      <div class="signup-card-div">
        <b-form @submit.prevent="signUp" @reset="onReset">
          <div class="signup-card-div-input mt-1">
            <b-form-group id="input-group-1" label="Your ID: " label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="payload.username"
                type="text"
                placeholder="Enter your ID"
                required
              ></b-form-input>
            </b-form-group>
      
            <b-form-group id="input-group-2" label="Your Name: " label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="payload.nickname"
                type="text"
                placeholder="Enter your nickname"
                required
              ></b-form-input>
            </b-form-group>
      
            <b-form-group id="input-group-3" label="Password: " label-for="input-3">
              <b-form-input
                id="input-3"
                type="password"
                placeholder="Enter your Password"
                v-model="payload.password1"
                required
              ></b-form-input>
            </b-form-group>
      
            <b-form-group id="input-group-4" label="Password Check: " label-for="input-4">
              <b-form-input
                id="input-4"
                type="password"
                v-model="payload.password2"
                placeholder="Enter your Password Again"
                required
                description="password를 다시 입력해주세요."
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-6" label="Age: " label-for="input-6">
              <b-form-input
              id="input-6"
              type="number"
              placeholder="20" 
              min="0" 
              max="130"
              v-model="payload.age"
              required
              ></b-form-input>
            </b-form-group>
  
            <b-form-group id="input-group-5" label="MBTI: " label-for="input-5">
              <b-form-select
                id="input-5"
                v-model="payload.mbti"
                :options="options"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group>
              <label for="img"> Profile IMG:  </label>
              <br>
              <input type="file" ref="doc" id="img" @change="findImg" > 
            </b-form-group>
            <div class="m-3"></div>
            <div>
              <b-button style="width:90%" type="submit" variant="primary">SIGN UP</b-button>
              <b-button style="width:10%%" type="reset" variant="danger">Reset</b-button>
            </div>
          </div>
        </b-form> 
      </div>
    </div>
  </div>
  

</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      payload: {
        username: '',
        password1: '',
        password2: '',
        profile_img: '',
        nickname: '',
        age: 0,
        mbti: null,
      },
      options: [{ text: 'Select One', value: null }, 'ESTJ','ESFJ','ENTJ','ENFJ','ESTP','ESFP','ENTP','ENFP','ISTJ','ISFJ','INTJ','INFJ','ISTP','ISFP','INTP','INFP'],
    }
  },
  methods: {
    findImg(event) {
      let payload = this.payload;
      let reader = new FileReader()
      reader.onload = function(event) {
        payload.profile_img = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0])
    },
    signUp() {
      // console.log(this.payload)
      const payload = this.payload      
      this.$store.dispatch('signUp', payload)
    },
    onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.payload.username = ''
        this.payload.password1 = ''
        this.payload.password2 = ''
        this.payload.profile_img = ''
        this.payload.nickname = ''
        this.payload.age = 0
        this.payload.mbti =null
        // Trick to reset/clear native browser form validation state
    }
  }
}
</script>
<style>
.signup-card {
  margin: 0 auto;
  margin-top: 100px;
  height: 100vh;
}
.signup-card-div {
  padding: 25px;
  margin: 0 auto;
  min-height: auto;
  min-width: 700px;
  height: 510px;
  width: 900px;
  background-color: #D9D9D9;
  border-radius: 10px;
}
.signup-card-div-input {
  
  margin: 0 auto;
  min-height: 300px;
  min-width: 600px;
  height: 350px;
  width: 850px;
}
</style>