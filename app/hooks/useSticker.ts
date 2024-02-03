import assoc from "ramda/src/assoc";
import ramdaClone from "ramda/src/clone";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { BOARD_TYPE, DEFAULT_COORDS } from "@/app/constants";
import { Sticker, stickers as stickersObj } from "@/app/data";

import useModal from "./useModal.hook";

type UseStickerProps = {
  board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE];
}

const useSticker = (props: UseStickerProps) => {
  const {board}  = props;

  const [stickers, setStickers] = useState<Record<string, Sticker>>({});
  const [editedSticker, setEditedSticker] = useState<Sticker | null>(null);

  const { isModalOpen, setModalVisibility, closeModal, openModal } = useModal();

  /**
   * Create sticker
   */
  const createSticker = ({
    text,
    board,
    id,
  }: {
    text: string;
    board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE];
    id: string | undefined;
  }) => {
    const stickersClone = ramdaClone(stickers);

    if (id && text === stickersClone[id].text) {
      closeModal();
      return;
    }

    if (id) {
      stickersClone[id].text = text;

      setStickers(stickersClone);
    } else {
      const newId = uuid();

      stickersClone[newId] = {
        id: newId,
        top: DEFAULT_COORDS.top,
        left: DEFAULT_COORDS.left,
        createdAt: new Date().toISOString(),
        text,
        board,
      };
    }

    setStickers(stickersClone);
    closeModal();
  };

  /**
   * Edit sticker
   */
  const editSticker = (sticker: Sticker) => (e: MouseEvent) => {
    e.stopPropagation();

    setEditedSticker(sticker);
    openModal();
  };

  /**
   * close modal
   */
  const closeModalHandler = () => {
    closeModal();

    if (editedSticker) {
      setEditedSticker(null);
    }
  };

  /**
   * Lifecycle
   */
  useEffect(() => {
    const filtered = Object.values(stickersObj).reduce((acc, item) => {
      if(item.board === board) {
        return assoc('id', item, acc);
      }

      return acc;
    }, {} );

    setStickers(filtered);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    closeModal,
    closeModalHandler,
    createSticker,
    editSticker,
    editedSticker,
    isModalOpen, 
    setModalVisibility, 
    stickers: Object.values(stickers),
  };
}

export default useSticker