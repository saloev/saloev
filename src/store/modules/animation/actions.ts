import { ActionTree } from 'vuex';
import { RootState, Animation as AnimationType } from '@/types/store/types';

import state from './state';

import Animation from '@/utils/animation';

const actions: ActionTree<AnimationType, RootState> = {
  setDomList({ commit }, payload: Array<Element>):any {
    commit('saveDomList', payload);
  },

  animatePageLeave(): Promise<any> {
    return Promise.all([
      Animation.animateArrayOfElements(state.domList, false),
    ]);
  },
};

export default actions;
