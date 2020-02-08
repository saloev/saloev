import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

/* user store
---------------*/
import animation from '@/store/modules/animation/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    animation,
  },

  state,
  actions,
  mutations,
  getters,
});
