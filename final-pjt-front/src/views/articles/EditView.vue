<template>
  
  <div>
    <div class="mainitem-blank-height"></div>
    <div class="mainitem-blank-height"></div>
    <h1>게시글 수정</h1>
    <form @submit.prevent="articleEdit" class="p-2">
      <label for="title"><h5>제목</h5></label>
      <div>
        <input :value="title" @input="title=$event.target.value" type="text"><br>
      </div>
      <label for="type"><h5>종류</h5></label>
      <div class="formtag-form-choose">
        <select id="type" v-model.trim="type">
          <option disabled="disabled">선택해 주세요.</option>
          <option v-if="user_now === 'admin'" value="공지사항">공지사항</option>
          <option value="자유게시판">자유게시판</option>
          <option value="Q&A">Q&A</option>
        </select>
      </div>

      <label for="content">내용 : </label>
      <div>
        <textarea :value="content" @input="content=$event.target.value" style="width:500px; height:300px"></textarea><br>
      </div>
      <input type="submit" id="submit">
      <button @click="articleDelete">[DELETE]</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: "EditView",
  data() {
    return {
      article: null,
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
  created() {
    this.getArticleDetail()
  },
  methods: {
    getArticleDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/articles/${this.$route.params.id}/`
      })
        .then((res) => {
          console.log(res)
          this.article = res.data
          this.title = this.article.title
          this.content = this.article.content
          this.type = this.article.type
          console.log(this.article)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    articleDelete() {
      axios({
        method: 'delete',
        url: `${API_URL}/articles/${this.$route.params.id}/`
      })
      .then(() => {
        console.log(this.$store.state.articles)
        this.$store.dispatch('ArticleDelete', this.article.id)
        this.$router.push({ name: 'ArticleView' })
      })
      .catch((err) => {
        console.log(err)
      })
    },
    articleEdit() {
      const articleItem = {
        title: this.title,
        content: this.content,
        type : this.type
      }
      axios({
        method: 'PUT',
        url: `${API_URL}/articles/${this.$route.params.id}/`,
        data: articleItem,
      })
        .then((res) => {
          console.log(res) 
          this.$router.push({ name: 'DetailView', params: this.articleId})
        })
        .catch((err) => {
          console.log(err)
        })
    },
  }
}
</script>

<style>
.allfont{
  color: white
}
</style>