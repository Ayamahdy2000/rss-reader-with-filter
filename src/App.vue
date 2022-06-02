<template>
  <section class="news container">
    <header>
      <h1 class="news__heading">
        <span class="news__heading-firstWord">CNN</span>.com - RSS Channel - App
        International Edition
      </h1>
      <filter-section
        :allArticles="articles"
        @getArticles="getArticles"
        @getCurrentPage="getCurrentPage"
      />
    </header>
    <main>
      <div class="row">
        <div
          :class="[
            calSize(index) ? 'col-lg-8 col-md-8 ' : 'col-lg-4 col-md-4 ',
            (index + 1) % 7 === 1 ? 'col-sm-12' : 'col-sm-6',
          ]"
          class="col-12"
          v-for="(item, index) in articles"
          :key="index"
        >
          <Card :item="item" />
        </div>
      </div>
    </main>
    <footer class="news__footer">
      <div ref="infiniteScrollTrigger" class="news__trigger"></div>
      <div class="news__cirle-loader" v-if="showLoader"></div>
    </footer>
  </section>
</template>

<script>
import axios from "axios";
import Card from "./components/cardNews.vue";
import FilterSection from "./components/filter-section.vue";
import data from "./data/news.json";
export default {
  name: "App",
  components: { Card, FilterSection },

  data() {
    return {
      articles: data.slice(0, 50),
      currentPage: 1,
      showLoader: false,
      pageCount: 1,
    };
  },
  mounted() {
    // this.getNews(this.scrollTrigger());
    // setTimeout(() => {
    //   this.scrollTrigger();
    // }, 500);
  },
  watch: {
    currentPage() {
      this.getNews();
    },
  },

  methods: {
    getArticles(articles) {
      this.articles = articles;
    },
    getCurrentPage(currentPage) {
      this.currentPage = currentPage;
    },
    scrollTrigger() {
      const observer = new IntersectionObserver((enteries) => {
        enteries.forEach((entery) => {
          if (
            entery.intersectionRatio > 0 &&
            this.currentPage < this.pageCount
          ) {
            this.showLoader = true;
            setTimeout(() => {
              this.currentPage += 1;
              this.showLoader = false;
            }, 2000);
          }
        });
      });
      observer.observe(this.$refs.infiniteScrollTrigger);
    },
    getNews(callback) {
      axios
        .get(
          `https://gnews.io/api/v4/top-headlines?token=24350a938bc2fd65ae570ac72e06f097&page=${this.currentPage}&max=7&country=eg`
        )
        .then((res) => {
          this.articles.push(...res.data.articles);
          this.pageCount = res.data.totalArticles / 7;
          callback();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    calSize(index) {
      if (index === 0 || (index + 1) % 7 === 0 || (index + 1) % 7 === 1) {
        return true;
      }
    },
  },
};
</script>

<style></style>
