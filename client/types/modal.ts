export type TModal = {
  isShowing: boolean;
  type: 'none' | 'loading' | TModalType;
  overlay?: 'none' | 'black'; // 모달 바깥쪽 색상
  outsideClick?: boolean; // 바깥 쪽 클릭 시 모달 닫기기능
};

type TModalType = {
  dialog: {
    title?: string;
    description: string;
    confirmButton?: string;
    cancleButton?: string;
    onClickConfirm?: () => void;
    onClickCancle?: () => void;
  };
};
