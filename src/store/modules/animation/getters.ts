import { GetterTree } from 'vuex';
import { RootState, Animation } from '@/types/store/types';

const getters: GetterTree<Animation, RootState> = {
  domList(state): Array<Element| undefined> {
    return state.domList;
  },
};

export default getters;
