import { Module } from 'vuex';
import { RootState, Animation } from '@/types/store/types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import state from './state';


const namespaced: boolean = true;

const animation: Module<Animation, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default animation;
