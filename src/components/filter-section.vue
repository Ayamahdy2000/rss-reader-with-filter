<template>
  <div class="news__filter row">
    <div class="col-4">
      <input
        type="search"
        placeholder="Search"
        class="px-2 py-1 news__filter-input"
        v-model="state.formData.name"
        @blur="v$.formData.name.$touch"
      />
      <div class="news__filter-error" v-if="v$.formData.name.$error">
        The name must be larger than 3 char
      </div>
    </div>
    <div class="col-7">
      <DatePicker v-model="state.formData.range" is-range :masks="masks">
        <template v-slot="{ inputValue, inputEvents }">
          <div class="row">
            <div class="col-sm-6 col-12">
              <input
                placeholder="Start Date"
                :value="inputValue.start"
                v-on="inputEvents.start"
                class="px-2 py-1 w-32 news__filter-input"
              />
            </div>

            <div class="col-sm-6 col-12">
              <input
                placeholder="End Date"
                :value="inputValue.end"
                v-on="inputEvents.end"
                class="px-2 py-1 w-32 news__filter-input"
              />
            </div>
          </div>
        </template>
      </DatePicker>
    </div>
    <div class="col-1">
      <button class="news__btn" @click="filter()">Filter</button>
    </div>
  </div>
</template>

<script>
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";
import useVuelidate from "@vuelidate/core";
import { minLength } from "@vuelidate/validators";
import { reactive } from "vue";
export default {
  name: "App",
  props: ["allArticles"],
  components: { DatePicker },
  setup() {
    const state = reactive({
      formData: {
        name: null,
        range: {
          start: null,
          end: null,
        },
      },
      attrs: {
        highlight: "green",
      },
    });
    const rules = {
      formData: {
        name: { minLength: minLength(3) },
      },
    };

    const v$ = useVuelidate(rules, state);
    return { state, v$ };
  },
  data() {
    return {
      articles: [...this.allArticles],
      masks: {
        input: "YYYY MMM DD",
      },
    };
  },

  methods: {
    filter() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.articles = this.articles.filter((article) => {
          if (
            this.state.formData.name != null &&
            this.state.formData.range.start != null
          ) {
            if (article.title && article.date) {
              return (
                article.title.search(this.state.formData.name) != -1 &&
                new Date(article.date).setHours(0, 0, 0, 0) >=
                  this.state.formData.range.start &&
                new Date(article.date).setHours(0, 0, 0, 0) <=
                  this.state.formData.range.end
              );
            }
          } else if (
            this.state.formData.name != null &&
            this.state.formData.range.start == null
          ) {
            if (article.title != null) {
              return article.title.search(this.state.formData.name) != -1;
            }
          } else {
            if (article.date) {
              return (
                new Date(article.date).setHours(0, 0, 0, 0) >=
                  this.state.formData.range.start &&
                new Date(article.date).setHours(0, 0, 0, 0) <=
                  this.state.formData.range.end
              );
            }
          }
        });
        this.$emit("getArticles", this.articles);
      }
    },
    // getAllArticles() {
    //   if (!this.state.formData.name ) {
    //     console.log(this.allArticles)
    //     this.$emit("getArticles", this.allArticles);
    //   }
    // },
  },
};
</script>
