<template>
  <div>
    <div class="d-flex justify-content-between">
      <div>
        <p class="putmouse" @click.prevent="profileView">글쓴이 : {{ comment.nickname }}</p>
        <h5>{{ comment.content }}</h5>
        <p>created_at : {{ comment.created_at }}</p>
      </div>
      <div class="d-flex align-items-center">
        <button v-if="login_user === write_user" class="btn btn-outline-danger btn-sm mx-3" @click="deleteComment">[Delete]</button>
      </div>
    </div>
    <hr>
  </div>
</template> 

<script>
// import axios from 'axios'

// const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommentListItem',
  props: {
    comment: Object
  },
  data() {
    return {
      commentId: this.comment.id,
      articleId: this.comment.article
    }
  },
  computed: {
    write_user() {
      return this.comment.username
    },
    login_user() {
      return this.$store.state.username
    }
  },
  methods: {
    deleteComment: function () {
      this.$emit('deleteComment', this.commentId)
    },
    profileView() {
      // console.log(this.comment)
      // console.log(this.comment.user.username)
      this.$router.push({ name: 'ProfileView' , params:{ username : this.comment.username }})
    }
  },
}
</script>

<style>

</style>