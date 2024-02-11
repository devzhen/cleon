import ramdaClone from "ramda/src/clone";
import omit from "ramda/src/omit";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import { DEFAULT_STICKER_POS } from "@/constants";
import type { Sticker, BoardType } from '@/types';
import decreaseZIndexMoreThan from "@/utils/decreaseZIndexMoreThan";

import useModal from "./useModal.hook";

type UseStickerProps = {
  board: BoardType;
  onInteract: (board: BoardType) => void,
  initialStickers: Record<string, Sticker>;
}

const useSticker = (props: UseStickerProps) => {
  const { board, onInteract, initialStickers }  = props;

  const highestZIndex = useRef(0);

  const [stickers, setStickers] = useState<Record<string, Sticker>>(initialStickers);
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
    board: BoardType;
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
        top: DEFAULT_STICKER_POS.top,
        left: DEFAULT_STICKER_POS.left,
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

    onInteract(board);
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

    onInteract(board);

    // TODO: send the data to a server
  };  

  /**
   * Lifecycle
   */
  useEffect(() => {
    if (isModalOpen && isDeleteMode) {
      setIsDeleteMode(false);
    }
  }, [isModalOpen, isDeleteMode]);

  /**
   * Lifecycle
   */
  useEffect(() => {
    if (isModalOpen) {
      onInteract(board);
    }
  }, [board, isModalOpen, onInteract]);

  /**
   * Lifecycle
   */
  useEffect(() => {
    Object.values(initialStickers).forEach(sticker => {
      if (sticker.zIndex > highestZIndex.current) {
        highestZIndex.current = sticker.zIndex;
      }
    });
  }, [initialStickers]);

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
