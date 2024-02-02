import { useState } from "react";
import { v4 as uuid } from "uuid";

import { stickers as stickersArray, Sticker } from "@/app//data";
import { DEFAULT_COORDS, BOARD_TYPE } from "@/app/constants";

import useModal from "./useModal.hook";

const useSticker = () => {
  const [stickers, setStickers] = useState<Sticker[]>(stickersArray);

  const { isModalOpen, setModalVisibility, closeModal } = useModal();

  const createSticker = (text: string, board: typeof BOARD_TYPE[keyof typeof BOARD_TYPE]) => {
    const sticker = {
      id: uuid(),
      top: DEFAULT_COORDS.top,
      left: DEFAULT_COORDS.left,
      createdAt: new Date().toISOString(),
      text,
      board,
    };

    setStickers((prev) => [...prev, sticker]);
  }

  return {
    stickers,
    isModalOpen,
    setModalVisibility,
    closeModal,
    createSticker
  }
}

export default useSticker