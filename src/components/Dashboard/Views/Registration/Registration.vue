<template>
  <div>
    registration page

    <button class="btn btn-primary" @click.prevent="registration">test</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  //   data() {
  //     return {

  //     };
  //   },
  methods: {
    ...mapActions({
      registration: "course/registration",
    }),
  },
  //   computed: {
  //     ...mapGetters({
  //       course: "course/course",
  //     }),
  //   },
  //   async created() {
  //     this.id = this.$route.params.id;
  //     this.isLoading = true;
  //     await this.getCourse(this.id);
  //     this.tags.dynamicTags = this.course.tags;
  //     this.isLoading = false;
  //   },
};
</script>
