import React from 'react';
import styles from './recoilModal.module.scss';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import cx from 'classnames';
import { LoadingModal } from './index';

const RecoilModal = () => {
  const [{ isShowing, type, overlay, outsideClick }, setModalState] = useRecoilState(modalAtom);
  const resetModal = useResetRecoilState(modalAtom);
  let innerModal = <div />;

  const handleHideModal = () => resetModal();

  const handleClickOutside = () => (outsideClick ? handleHideModal() : '');

  if (typeof window === 'undefined' || !isShowing || type === 'none') return;
  if (type === 'loading') innerModal = <LoadingModal />;

  return (
    <div onClick={handleClickOutside} className={cx(styles.modalWrapper, styles[`overlay${overlay}`])}>
      {innerModal}
    </div>
  );
};

export default RecoilModal;
