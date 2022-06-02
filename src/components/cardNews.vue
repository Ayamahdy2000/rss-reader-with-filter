<template>
  <div class="w-100 card">
    <img :src="item.image" class="card__img img-fluid"  />
    <div class="card__content">
      <h4 class="card__card-heading" :title="item.title">{{ item.title }}</h4>
      <p v-if="item && item.date" class="card__card-date">
      {{this.item.date}}
   
      </p>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["item"],
  methods: {
    moment() {
      return moment();
    },
  },
  data() {
    return {
      data: new Date(),
    };
  },
};
</script>
