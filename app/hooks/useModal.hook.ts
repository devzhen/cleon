import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setModalVisibility = (isOpen: boolean) => () => {
    setIsModalOpen(isOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return  {
    isModalOpen,
    setModalVisibility,
    closeModal,
    openModal,
  };
};

export default useModal;
