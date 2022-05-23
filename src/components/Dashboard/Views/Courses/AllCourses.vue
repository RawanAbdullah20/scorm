<template>
  <div class="mt-5 row">
    <div>Courses:</div>
    <div
      v-for="course in courseData"
      :key="course.id"
      class="col-12 col-md-6 col-lg-3 mx-1 my-3 course_card"
    >
      <router-link :to="{ name: 'CoursePreview', params: { id: course.id } }">
        <div>
          <p class="text-center pb-3 fw-bold">{{ course.title }}</p>
          <p class="mx-2 mb-4">
            This Course Conatin
            {{ course.rootActivity.children.length }} Section
          </p>
          <p v-if="course.tags.length > 0">Course Tags:</p>
          <div class="d-flex flex-wrap">
            <p v-for="tag in course.tags" :key="tag" class="tag py-2 px-3 mx-1">
              {{ tag }}
            </p>
          </div>
        </div></router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      getCourses: "course/getCourses",
    }),
  },
  computed: {
    ...mapGetters({
      courseData: "course/courses",
    }),
  },
  async created() {
    this.getCourses();
  },
};
</script>

<style scoped lang="scss">
.course_card {
  padding: 30px 20px;
  background-color: #a49e93;
  border-radius: 5px;
  a {
    text-decoration: none;
    color: white;
  }
  .tag {
    background-color: #ebe3d5;
    border-radius: 15px;
    color: #7a756b;
  }
}
</style>
