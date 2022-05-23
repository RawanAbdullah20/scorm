<template>
  <div v-if="!isLoading">
    <p>{{ course.title + course.id }}</p>
    <p>Course Contant :</p>
    <ul>
      <li v-for="section in course.rootActivity.children" :key="section.title">
        {{ section.title }}
        <ul v-if="section.children.length > 0">
          <li v-for="subsection in section.children" :key="subsection.title">
            {{ subsection.title }}
          </li>
        </ul>
      </li>
    </ul>
    <h4 class="card-title">Tags</h4>

    <el-tag
      :key="tag"
      v-for="tag in tags.dynamicTags"
      type="primary"
      :closable="true"
      :close-transition="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>

    <input
      type="text"
      placeholder="Add new tag"
      class="form-control input-new-tag"
      v-model="tags.inputValue"
      ref="saveTagInput"
      size="mini"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <br />

    

    <div class="d-flex justify-content-center justify-content-md-end">
      <button class="btn btn-primary" @click.prevent="previewCourse(course.id)">
        Preview
      </button>
      
    </div>
  </div>
  <div v-else>loading</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Tag } from "element-ui";

export default {
  data() {
    return {
      id: 0,
      isLoading: false,
      tags: {
        dynamicTags: [],
        inputVisible: false,
        inputValue: "",
      },
    };
  },
  components: { [Tag.name]: Tag },
  methods: {
    ...mapActions({
      getCourse: "course/getCourse",
      previewCourse: "course/getCoursePreview",
      test: "course/testArray",
      setTags: "course/setCourseTags",
      deleteTags: "course/deleteTags",
    }),
    handleClose(tag) {
      this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1);
      this.deleteTags({ id: this.id, tag: tag });
    },

    handleInputConfirm() {
      let inputValue = this.tags.inputValue;
      if (inputValue) {
        this.tags.dynamicTags.push(inputValue);
        this.setTags({ id: this.id, tag: this.tags.dynamicTags });
      }
      this.tags.inputVisible = false;
      this.tags.inputValue = "";
    },
  },
  computed: {
    ...mapGetters({
      course: "course/course",
    }),
  },
  async created() {
    this.id = this.$route.params.id;
    this.isLoading = true;
    await this.getCourse(this.id);
    this.tags.dynamicTags = this.course.tags;
    this.isLoading = false;
  },
};
</script>
<style scoped lang="scss">
.tag {
  background-color: #ebe3d5;
  border-radius: 15px;
  color: #7a756b;
  cursor: pointer;
}
</style>
