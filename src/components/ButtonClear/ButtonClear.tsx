import style from './ButtonClear.module.css'
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { useStore } from '../../store/store';

export function ButtonClear() {
  const [isOpen, setIsOpen] = useState(false);
  const resetFavorite = useStore(state => state.resetFavorite);

  const title = 'Очистить избранное';
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className={`${style.buttonBlue} ${style.clearButton}`}
        title={title}
      >
        {title}
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={style.modalContent}>
          <p>{`${title}?`}</p>
          <div className={style.blockButtons}>
            <button className={style.buttonBlue} onClick={() => {
              resetFavorite();
              setIsOpen(false);
            }} >Да</button>
            <button onClick={() => setIsOpen(false)} >Отменить</button>
          </div>
        </div>
      </Modal>
    </>
  )
}