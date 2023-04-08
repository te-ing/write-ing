import React from 'react';
import styles from './modal.module.scss';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';

export interface ModalPropsType {}

const Modal = () => {
  const [{ isShowing }, setModalState] = useRecoilState(modalAtom);
  const resetModal = useResetRecoilState(modalAtom);

  const handleHideModal = () => {
    resetModal();
  };

  if (typeof window === 'undefined' || !isShowing) return;
  else {
    return (
      <div onClick={handleHideModal} className={styles.modalWrapper}>
        test
      </div>
    );
  }
};

export default Modal;
