<template>
  <div>
    <UploadeCourse />
    <AllCourses />
  </div>
</template>
<script>
import UploadeCourse from "@/components/Dashboard/Views/Courses/UploadeCourse.vue";
import AllCourses from "@/components/Dashboard/Views/Courses/AllCourses.vue";

export default {
  name: "home-s",
  components: { UploadeCourse, AllCourses },
};
</script>
