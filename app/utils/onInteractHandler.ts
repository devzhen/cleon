import { BoardType } from '@/app/types';

const onInteractHandler = (board: BoardType) => {
  const stickerContainers = document.querySelectorAll('.sticker-container');

  for (let i = 0; i < stickerContainers.length; i++) {
    const stickerContainer = stickerContainers[i] as HTMLDivElement;

    const containerBoard = stickerContainer.getAttribute('data-board');

    if (containerBoard === board) {
      stickerContainer.classList.remove('boardNotActive');
      stickerContainer.classList.add('boardActive');
    } else {
      stickerContainer.classList.remove('boardActive');
      stickerContainer.classList.add('boardNotActive');
    }
  }
};

export default onInteractHandler;
