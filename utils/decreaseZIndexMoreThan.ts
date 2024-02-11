import { BOARD_TYPE } from '@/constants';

const decreaseZIndexMoreThan = (
  board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE],
  zIndex: number,
) => {
  const stickers = document.querySelectorAll(`.sticker[data-board="${board}"`);

  for (let i = 0; i < stickers.length; i++) {
    const sticker = stickers[i] as HTMLDivElement;

    const stickerZIndex = parseInt(window.getComputedStyle(sticker, null).zIndex);

    if (stickerZIndex >= zIndex) {
      sticker.style.zIndex = `${Math.max(0, stickerZIndex - 1)}`;
    }
  }
};

export default decreaseZIndexMoreThan;
