<template>
  <div class="article-list">
    <div>
      <b-card no-body class="article-body">
        <b-tabs card>
          <b-tab title="자유게시판" active>
            <ArticleListItem
              v-for="article in article1"
              :key="article.id"
              :article="article"
            />
          </b-tab>
          <b-tab title="Q&A">
            <ArticleListItem
              v-for="article in article2"
              :key="article.id"
              :article="article"
            />
          </b-tab>
          <b-tab title="공지사항">
            <ArticleListItem
              v-for="article in article3"
              :key="article.id"
              :article="article"
            />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import ArticleListItem from '@/components/articles/ArticleListItem'

export default {
  name: 'ArticleList',
  components: {
    ArticleListItem
  },
  computed: {
    article1(){
      return this.$store.state.articles.filter((article)=> article.type === '자유게시판')
    },
    article2(){
      return this.$store.state.articles.filter((article)=> article.type === 'Q&A')
    },
    article3(){
      return this.$store.state.articles.filter((article)=> article.type === '공지사항')
    }
  }
}
</script>

<style>
.article-list {
  text-align: start;
}
.article-body {
  border-radius: 5px;
  -moz-box-shadow: 0 0 3px #ccc;
  -webkit-box-shadow: 0 0 3px #ccc;
  box-shadow: 0 0 3px #ccc;
  background-color: white;
}

</style>
