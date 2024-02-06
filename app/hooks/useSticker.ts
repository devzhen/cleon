import assoc from "ramda/src/assoc";
import ramdaClone from "ramda/src/clone";
import omit from "ramda/src/omit";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import { BOARD_TYPE, DEFAULT_COORDS } from "@/app/constants";
import { Sticker, stickers as stickersObj } from "@/app/data";
import decreaseZIndexMoreThan from "@/app/utils/decreaseZIndexMoreThan";

import useModal from "./useModal.hook";

type UseStickerProps = {
  board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE];
}

const useSticker = (props: UseStickerProps) => {
  const { board }  = props;

  const highestZIndex = useRef(0);

  const [stickers, setStickers] = useState<Record<string, Sticker>>({});
  const [editedSticker, setEditedSticker] = useState<Sticker | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

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

      const newZIndex = highestZIndex.current + 1;

      stickersClone[newId] = {
        id: newId,
        top: DEFAULT_COORDS.top,
        left: DEFAULT_COORDS.left,
        createdAt: new Date().toISOString(),
        text,
        board,
        zIndex: newZIndex,
      };
    }

    setStickers(stickersClone);
    setEditedSticker(null);
    closeModal();

    // TODO: send the data to a server
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
   * Toggle delete mode
   */
  const toggleDeleteMode = () => {
    setIsDeleteMode(prev => !prev);
  };

  /**
   * Remove sticker
   */
  const removeSticker = (id: string, zIndex: number) => () => {
    decreaseZIndexMoreThan(board, zIndex);

    setStickers(prev => omit([id], prev));
    setIsDeleteMode(false);

    // TODO: send the data to a server
  }; 

  /**
   * Adjust z-indexes
   */
  const adjustZIndexes = ({ zIndex, stickerId }: { zIndex: number, stickerId: string }) => {
    decreaseZIndexMoreThan(board, zIndex);

    const sticker = document.querySelector(`[data-id="${stickerId}"]`) as HTMLDivElement;
    sticker.style.zIndex = `${highestZIndex.current}`;

    // TODO: send the data to a server
  };  

  /**
   * Lifecycle
   */
  useEffect(() => {
    const filtered = Object.values(stickersObj).reduce((acc, item) => {
      if(item.board === board) {
        if (item.zIndex > highestZIndex.current) {
          highestZIndex.current = item.zIndex;
        }

        return assoc(item.id, item, acc);
      }

      return acc;
    }, {} );

    setStickers(filtered);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    adjustZIndexes,
    closeModal,
    closeModalHandler,
    createSticker,
    editedSticker,
    editSticker,
    isDeleteMode,
    isModalOpen, 
    removeSticker,
    setIsDeleteMode,
    setModalVisibility, 
    stickers: Object.values(stickers),
    toggleDeleteMode,
  };
};

export default useSticker;
