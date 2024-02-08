import { parseISO, format } from "date-fns";
import Image from "next/image";
import { useRef } from "react";

import { BOARD_TYPE } from "@/app/constants";
import { Sticker } from "@/app/data";

import styles from "./Sticker.module.css";

type StickerProps = {
  board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE];
  editSticker: (e: MouseEvent) => void;
  isDeleteMode: boolean;
  onMouseDown: VoidFunction;
  removeSticker: () => void;
  sticker: Sticker;
};

const Sticker = (props: StickerProps) => {
  const {
    board,
    editSticker,
    isDeleteMode,
    onMouseDown,
    removeSticker,
    sticker,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const date = parseISO(sticker.createdAt);
  const dateFormatted = format(date, "MM-dd-yyyy HH:mm:ss aa");

  return (
    <div
      className={`${styles.container} sticker`}
      onMouseDown={onMouseDown}
      data-id={sticker.id}
      data-board={board}
      ref={containerRef}
      style={{
        top: sticker.top,
        left: sticker.left,
        zIndex: sticker.zIndex,
      }}
    >
      <span data-role="date">{dateFormatted}</span>
      <div data-role="content-wrapper">
        <span>{sticker.text}</span>
      </div>
      <div data-role="image-wrapper">
        {!isDeleteMode && (
          <Image
            src="/reg.png"
            width={13}
            height={13}
            alt="Picture of the author"
            draggable={false}
            onClick={editSticker as VoidFunction}
          />
        )}
        {isDeleteMode && (
          <Image
            src="/del.png"
            width={13}
            height={13}
            alt="Picture of the author"
            draggable={false}
            onClick={removeSticker as VoidFunction}
          />
        )}
      </div>
    </div>
  );
};

export default Sticker;
