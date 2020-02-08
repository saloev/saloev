import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import state from './state';

import { RootState, Animation } from '@/types/vuex/types';


const namespaced: boolean = true;

const animation: Module<Animation, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default animation;
