import { createPortal } from 'react-dom';
import style from './Modal.module.css';

export function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; }) {
  if (!isOpen) return (
    <div className={style.modalOverlay}></div>
  );

  return createPortal(
    <div className={`${style.modalOverlay} ${style.open}`}>
      <div className={style.modalBackground} onClick={onClose}></div>
      <div className={style.modalContent}>
        {children}
      </div>
    </div>,
    document.body
  );
}