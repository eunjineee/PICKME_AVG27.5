<template>
  <div class="articlefont">
    <h2>{{ article.title }}</h2>
    <p class="putmouse" @click.prevent="profileView">작성자 : {{ article.nickname }}</p>
    <p class="d-inline-block text-truncate" style="max-width: 400px;">{{ article.content }}</p>
    <p></p>
    <router-link :to="{ name: 'DetailView', params: {id : article.id}  }">[DETAIL]</router-link>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  },
  methods: {
    profileView() {
      this.$router.push({ name: 'ProfileView' , params:{ username : this.article.username }})
    }
  }
}
</script>

<style>
.articlefont {
  color: #232323;
}
</style>
