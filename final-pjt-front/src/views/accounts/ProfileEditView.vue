<template>
  <div>
  <div class="login-card">
    <div style="text-align:center">
      <img src="@/assets/PICME3.png" alt="">
    </div>
    <div class="login-card-div mt-3 pt-1">
      <b-form @submit.prevent="profileEdit" @reset="onReset">
        <div class="login-card-div-input mt-1">
          <b-form-group id="input-group-11" label="Your Name: " label-for="input-11">
            <b-form-input
              id="input-11"
              v-model="user.nickname"
              type="text"
              placeholder="Enter your nickname"
              required
            ></b-form-input>
          </b-form-group>
    
          <b-form-group id="input-group-6" label="Age: " label-for="input-6">
            <b-form-input
            id="input-6"
            type="number"
            placeholder="20" 
            min="0" 
            max="130"
            v-model="user.age"
            required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-15" label="MBTI: " label-for="input-15">
            <b-form-select
              id="input-15"
              v-model="user.mbti"
              :options="options"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group>
            <label for="img"> Profile IMG:  </label>
            <br>
            <input type="file" ref="doc" id="img" @change="findImg" > 
          </b-form-group>
          <div class="mt-3">
            <b-button style="width:90%" type="submit" variant="primary">EDIT</b-button>
          </div>
        </div>
      </b-form> 
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
name: 'ProfileEditView',
data() {
  return {
    user: {},
    options: [{ text: 'Select One', value: null }, 'ESTJ','ESFJ','ENTJ','ENFJ','ESTP','ESFP','ENTP','ENFP','ISTJ','ISFJ','INTJ','INFJ','ISTP','ISFP','INTP','INFP'],
  }
},
created() {
  this.getProfile()
},
methods: {
  getProfile() {
    axios({
      method: 'get',
      url: `${API_URL}/accounts/profile/${this.$route.params.username}/`,
    })
      .then((res) => {
        // console.log(res.data)
        this.user = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  findImg(event) {
    let payload = this.user;
    let reader = new FileReader()
    reader.onload = function(event) {
      payload.profile_img = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0])
  },
  profileEdit() {
    const payload = this.user
    this.$store.dispatch('profileEdit', payload)
  },
  onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.user.username = ''
      this.user.password1 = ''
      this.user.password2 = ''
      this.user.profile_img = ''
      this.user.nickname = ''
      this.user.age = 0
      this.user.mbti =null
      // Trick to reset/clear native browser form validation state
  }
}
}
</script>
