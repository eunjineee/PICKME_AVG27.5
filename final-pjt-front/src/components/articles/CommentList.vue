<template>
  <div>
    <h5 class="fw-bold my-4">댓글</h5>
    <comment-list-item class="container"
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @deleteComment="deleteComment"
    >
    </comment-list-item>
    <textarea v-model="content" class="form-control" placeholder="댓글을 남겨보세요." rows="5"></textarea>
    <div class="d-flex justify-content-end my-2">
      <button @click="createComment" class="btn btn-success">등록</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentListItem from '@/components/articles/CommentListItem.vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommentList',
  data: function () {
    return {
      comments: [],
      comment: null,
      content: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.user.pk
    }
  },
  props: {
    articleId: [String, Number],
  },
  components: {
    CommentListItem,
  },
  created(){
    this.commentlist()
  },
  methods: {
    createComment: function () {
      const content = this.content
      const article = this.articleId
      const user = this.user
      axios({
        method: 'post',
        url: `${API_URL}/articles/${this.articleId}/comment/`,
        data: {
          content: content,
          article: article,
          user: user,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.content = null
          this.comment = res.data
          this.comments.push(this.comment)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteComment(commentId){
      axios({
        method: 'delete',
        url: `${API_URL}/articles/${this.articleId}/comment/${commentId}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          // console.log(res, 'item에서 삭제중!!')
          this.comments = res.data
        })
        .catch((err) => {
          console.log(err)
          this.comments = []
        })
    },
    commentlist() {
      axios({
        method: 'get',
        url: `${API_URL}/articles/${this.articleId}/comment/`,
        headers: {Authorization: `Token ${this.$store.state.token}`}
      })
        .then((res) => {
          console.log('처음으로 댓글 받아올거야!')
          this.comments = res.data 
        })
        .catch(() => {
          console.log('댓글이 없어용')
        })
    }
  },
}
</script>

<style>
.putmouse:hover {
  text-decoration: underline;
  cursor : default 
}

</style>