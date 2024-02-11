import { BoardType } from '@/types';

const onInteractHandler = (board: BoardType) => {
  const stickerContainers = document.querySelectorAll('.sticker-container');

  for (let i = 0; i < stickerContainers.length; i++) {
    const stickerContainer = stickerContainers[i] as HTMLDivElement;

    const containerBoard = stickerContainer.getAttribute('data-board');

    if (containerBoard === board) {
      stickerContainer.classList.add('boardActive');
    } else {
      stickerContainer.classList.add('boardNotActive');
    }
  }
};

export default onInteractHandler;
