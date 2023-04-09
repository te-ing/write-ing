import { atom } from 'recoil';

type TModal = {
  isShowing: boolean;
  type?: 'loading';
};

export const modalAtom = atom<TModal>({
  key: 'modalAtom',
  default: {
    isShowing: false,
  },
});
