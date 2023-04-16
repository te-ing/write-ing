import { ReactNode } from 'react';
import ReactDom from 'react-dom';

type TProps = {
  children: ReactNode;
};

export default function PortalRoot({ children }: TProps) {
  return ReactDom.createPortal(children, document.getElementById('portal') as HTMLDivElement);
}
