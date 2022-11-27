<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="title">제목 : </label>
      <input type="text" id="title" v-model.trim="title"><br>

      <label for="type">종류 : </label>
        <select id="type" v-model.trim="type">
          <option disabled="disabled">선택해 주세요.</option>
          <option v-if="user_now === 'admin'" value="공지사항">공지사항</option>
          <option value="자유게시판">자유게시판</option>
          <option value="Q&A">Q&A</option>
        </select>
      <br>
      <label for="content">내용 : </label>
      <textarea id="content" cols="30" rows="10" v-model="content"></textarea><br>
      <button type="submit" id="submit" class="form-btn"><span >Submit</span></button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'


export default {
  name: 'CreateView',
  data() {
    return {
      title: null,
      content: null,
      type: null,
    }
  },
  computed: {
    login_user() {
      return this.$store.state.username 
    }
  },
  methods: {
    createArticle() {
      const title = this.title
      const content = this.content
      const type = this.type
      if (!title) {
        alert('제목을 입력해주세요')
        return
      } else if (!content) {
        alert('내용을 입력해주세요')
        return
      } 
      axios({
        method: 'post',
        url: `${API_URL}/articles/`,
        data: {
          title: title,
          content: content,
          type: type,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then(() => {
          this.$router.push({ name: 'ArticleView' })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.form-btn {
  width: 200px;
  height: 35px;
  border-radius: 30px;
  border: none;
  color: white;
  background-color: #2b54c4;
  text-align: center;
  opacity: 1;
  cursor: pointer;
  transition: 0.5s;
}
.form-btn:hover {
  opacity: 0.7;
  width: 260px;
}
.form-btn span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  font-size: 16px;
}
.form-btn span:after {
  content: "\00bb";
  font-size: 30px;
  position: absolute;
  opacity: 0;
  bottom: -8px;
  right: -15px;
  transition: 0.5s;
}
.form-btn:hover span {
  padding-right: 25px;
}
.form-btn:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
