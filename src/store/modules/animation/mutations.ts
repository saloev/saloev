import { MutationTree } from 'vuex';
import { RootState, Animation } from '@/types/store/types';

const mutation: MutationTree<Animation> = {
  saveDomList(state, domList: Array<Element>): void {
    state.domList = domList;
  },
};

export default mutation;
