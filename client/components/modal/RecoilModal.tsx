import React from 'react';
import styles from './recoilModal.module.scss';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import Loading from './Loading';

export interface ModalPropsType {}

const RecoilModal = () => {
  const [{ isShowing, type }, setModalState] = useRecoilState(modalAtom);
  const resetModal = useResetRecoilState(modalAtom);

  const handleHideModal = () => {
    resetModal();
  };

  if (typeof window === 'undefined' || !isShowing) return;
  if (type === 'loading') return <Loading />;
  return (
    <div onClick={handleHideModal} className={styles.modalWrapper}>
      test
    </div>
  );
};

export default RecoilModal;
