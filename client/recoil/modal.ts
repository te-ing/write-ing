import { atom } from 'recoil';
import { TModal } from 'types/modal';

export const modalAtom = atom<TModal>({
  key: 'modalAtom',
  default: {
    isShowing: false,
    type: 'none',
    overlay: 'black',
    outsideClick: false,
  },
});
