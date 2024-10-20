import { MouseEvent } from 'react'
import './Modal.css'

interface ModalProps {
  image: string;
  setImage(image: string): void;
}

export default function Modal({ image, setImage }: ModalProps) {
  return (
    <div className='modal-back' onClick={removeModal}>
      <img src={image} alt="larg-img" />
    </div>
  )

  function removeModal(e: MouseEvent<HTMLDivElement>) {
    if (e.target instanceof HTMLDivElement && e.target.classList.contains('modal-back')) {
      setImage('');
    }
  }
}
