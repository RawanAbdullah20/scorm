import Vue from "vue";
import Vuex from "vuex";
import course from "./module/courses/index";
import learner from "./module/learner/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    course,
    learner,
  },
});
