<template>
  <div class="">
    <form>
      <file-pond
        label-idle="Uploade Course"
        accepted-file-types="zip,application/zip, "
        :allow-multiple="false"
        @change="handleFilePondInit"
      />
      <button class="btn btn-primary" @click.prevent="UploadeVideo">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

import { mapActions, mapGetters } from "vuex";
export default {
  data: function () {
    return {
      coursePreview: [],
      id: 0,
    };
  },
  components: {
    FilePond,
  },
  computed: {
    ...mapGetters({
      getCoursesData: "course/courses",
    }),
  },
  methods: {
    ...mapActions({
      uplodaeCourse: "course/uplodaeCourse",
      getCourses: "course/getCourses",
    }),
    handleFilePondInit(event) {
      this.coursePreview = event.target.files[0];
    },
    async UploadeVideo() {
      let formData = new FormData();
      this.getLastId();
      let courseid = this.id;
      formData.append("contentMetadata", courseid.toString());
      formData.append("file", this.coursePreview);
      await this.uplodaeCourse({ formData: formData, id: courseid });
      this.coursePreview = [];
    },
    async getLastId() {
      let coursedata = await this.getCoursesData;
      const ids = coursedata.map((object) => {
        return object.id;
      });
      let max = Math.max(...ids);
      this.id = max + 1;
    },
  },
  async created() {
    await this.getCourses();
    this.getLastId();
  },
};
</script>
<style lang="scss">
.filepond--wrapper {
  a.filepond--credits {
    display: none;
  }
}
</style>
