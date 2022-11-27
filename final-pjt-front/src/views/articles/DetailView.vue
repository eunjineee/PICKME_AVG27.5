<template>
  <div>
    <div class="mainitem-blank-height"></div>
    <div class="article-title-i m-3">
      <h1>{{ article?.title }}</h1>
    </div>
    <p @click='profileView' class="putmouse">글쓴이 : {{ article?.nickname }}</p>
    <p>게시판 : {{ article?.type }}</p>
    <h3>내용 : {{ article?.content }}</h3>
    <p>작성시간 : {{ article?.created_at }}</p>
    <p>수정시간 : {{ article?.updated_at }}</p>
    <router-link v-if="login_user === write_user" class="btn btn-outline-success btn-sm mx-3" :to="{ name: 'EditView',  params : {id : article.id}}">[EDIT]</router-link>
    <button v-if="login_user === write_user" class="btn btn-outline-danger btn-sm mx-3" @click="articleDelete" >[DELETE]</button>
    <div>
      <!-- 댓글내용 -->
      <hr>
      <comment-list :articleId ="article.id"></comment-list>
    </div>
    <router-link class="btn btn-outline-danger btn-sm mx-3" :to="{ name: 'ArticleView'}">[뒤로가기]</router-link>
  </div>
</template>

<script>
import axios from 'axios'
import CommentList from '@/components/articles/CommentList'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailView',
  components: {
    CommentList
  },
  data() {
    return {
      article: null,
    }
  },
  created() {
    this.getArticleDetail()
    console.log('디테일 도착')
  },
  computed: {
    write_user() {
      return this.article.username
    },
    login_user() {
      return this.$store.state.username
    },
    nickname() {
      return this.$store.state.user.nickname
    }
  },
  methods: {
    getArticleDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/articles/${this.$route.params.id}/`
      })
        .then((res) => {
          this.article = res.data
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
        this.$store.dispatch('ArticleDelete', this.article.id)
        this.$router.push({ name: 'ArticleView' })
      })
      .catch((err) => {
        console.log(err)
      })
    },
    profileView() {
      this.$router.push({ name: 'ProfileView' , params:{ username : this.article.username }})
    }
  }
}
</script>
<style>

</style>