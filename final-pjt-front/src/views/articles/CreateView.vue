<template>
  <div class="allfont article-i">
    <div class="mainitem-blank-height"></div>
    <div class="mainitem-blank-height"></div>
    <h1>게시글 작성</h1>
    <form @submit.prevent="createArticle">
      <label for="title">제목 : </label>
      <div>
        <input type="text" id="title" v-model.trim="title"><br>
      </div>
      <label for="type">종류 : </label>
      <div>
        <select id="type" v-model.trim="type">
            <option disabled="disabled">선택해 주세요.</option>
            <option v-if="user_now === 'admin'" value="공지사항">공지사항</option>
            <option value="자유게시판">자유게시판</option>
            <option value="Q&A">Q&A</option>
          </select>
      </div>
      <div class="mainitem-blank-height"></div>
      <label for="content">내용 : </label>
      <div>

        <textarea id="content" cols="30" rows="10" v-model="content" style="width:500px; height:300px"></textarea><br>
      </div>
      <input type="submit" id="submit">
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
  computed:{
    user_now() {
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
      } else if (!type) {
        alert('타입을 정해주세요')
        return
      } else if (!content) {
        alert('내용을 입력해주세요')
        return
      }
      axios({
        method: 'post',
        url: `${API_URL}/articles/article/`,
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
.allfont{
  color: white
}
.article-i {
  margin: 0 auto;
  padding: 0;
}
</style>
