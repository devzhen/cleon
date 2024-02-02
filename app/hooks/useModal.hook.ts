import { useState } from "react"

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setModalVisibility = (isOpen: boolean) => () => {
    setIsModalOpen(isOpen);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return  {
    isModalOpen,
    setModalVisibility,
    closeModal
  }
}

export default useModal;