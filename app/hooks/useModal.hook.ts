import { useEffect, useState } from 'react';

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

  const adjustModalBg = () => {
    const modalBg = document.querySelector('.modal-bg') as HTMLDivElement;

    if (modalBg) {
      modalBg.style.left = `${document.documentElement.scrollLeft}px`;
      modalBg.style.width = `100vw`;
    }
  };

  useEffect(() => {
    adjustModalBg();

    const onScroll = () => {
      if (isModalOpen) {
        adjustModalBg();
      }
    };

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [isModalOpen]);

  return {
    isModalOpen,
    setModalVisibility,
    closeModal,
    openModal,
  };
};

export default useModal;
