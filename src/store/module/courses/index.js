import axios from "@/axios";

export default {
  namespaced: true,
  state: {
    courses: [],
    course: {},
  },

  getters: {
    courses(state) {
      return state.courses;
    },
    course(state) {
      return state.course;
    },
  },
  mutations: {
    UPLOADECOURSE(state, payload) {
      state.courses.push(payload);
    },
    GETCOURSES(state, payload) {
      state.courses = payload;
    },
    GETCOURSE(state, payload) {
      state.course = payload;
    },
  },
  actions: {
    async uplodaeCourse(context, payload) {
      const Uploaderesponse = await axios.post(
        `scorm/courses/${payload.id}`,
        payload.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTimeout(async () => {
        let status = "RUNNING";
        while (status === "RUNNING") {
          const id = Uploaderesponse.data.scormId.result;

          const CheckResponse = await axios.get(
            `scorm/courses/importJobs/${id}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          status = CheckResponse.data.status;
        }
        context.dispatch("getCourses");
      }, 5000);
    },
    async getCoursePreview(context, payload) {
      const courses = await axios.put(`scorm/courses/${payload}/preview`, {
        expiry: 120,
        redirectOnExitUrl: "hla.himam.com",
        tracking: true,
        launchAuth: {
          type: "cookies",
          options: {
            ipAddress: true,
            fingerprint: true,
            expiry: 0,
            slidingExpiry: 0,
          },
        },
      });
      window.open(courses.data.launchLink);
      // console.log(courses.data.launchLink);
    },

    async getCourse(context, payload) {
      const course = await axios.get(
        `scorm/courses/${payload}?includeRegistrationCount=false&includeCourseMetadata=false`
      );
      console.log(course.data);

      context.commit("GETCOURSE", course.data);
    },
    async getCourses(context) {
      const courses = await axios.get("scorm/courses");

      context.commit("GETCOURSES", courses.data.courses);
    },

    async setCourseTags(context, payload) {
      const courses = await axios.put(
        `scorm/courses/${payload.id}/tags?includeRegistrationCount=false&includeCourseMetadata=false`,
        {
          tags: payload.tag,
        }
      );
      console.log(courses.data);

      // context.commit("GETCOURSE", courses.data);
    },
    async deleteTags(context, payload) {
      const tags = await axios.delete(
        `scorm/courses/${payload.id}/tags?tags=${payload.tag}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(tags);
    },
    


  },
};
