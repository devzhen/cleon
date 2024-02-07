import { BOARD_TYPE } from "../constants";
import theme from '../theme';

const onInteractHandler = (board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE]) => {
  const stickerContainers = document.querySelectorAll('.sticker-container');

  for (let i = 0; i < stickerContainers.length; i++) {
    const stickerContainer = stickerContainers[i] as HTMLDivElement;

    const containerBoard = stickerContainer.getAttribute('data-board');

    
    if (containerBoard === board) {
      stickerContainer.style.borderColor = theme.colors.activeBoard;
    } else {
      stickerContainer.style.borderColor = theme.colors.notActiveBoard;
    }
  }
};

export default onInteractHandler;
