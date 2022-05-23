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
   
  },
  actions: {
  
  

    async registration(context, payload){
      console.log(payload);

      const test = await axios.get(`scorm/registrations/`);
      console.log(test);
      
    }
  },
};
