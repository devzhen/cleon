import { parseISO, format } from "date-fns";
import Image from "next/image";

import { BOARD_TYPE } from "@/app/constants";
import { Sticker } from "@/app/data";

import {
  Container,
  Date,
  Content,
  ContentWrapper,
  ImageWrapper,
} from "./styled";

type StickerProps = {
  board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE];
  editSticker: (e: MouseEvent) => void;
  isDeleteMode: boolean;
  onMouseDown: VoidFunction;
  removeSticker: () => void;
  sticker: Sticker;
  zIndex: number;
};

const Sticker = (props: StickerProps) => {
  const {
    board,
    editSticker,
    isDeleteMode,
    onMouseDown,
    removeSticker,
    sticker,
    zIndex,
  } = props;

  const date = parseISO(sticker.createdAt);
  const dateFormatted = format(date, "MM-dd-yyyy HH:mm:ss aa");

  return (
    <Container
      onMouseDown={onMouseDown}
      $top={sticker.top}
      $left={sticker.left}
      className="sticker"
      $zIndex={zIndex}
      data-id={sticker.id}
      data-board={board}
    >
      <Date>{dateFormatted}</Date>
      <ContentWrapper>
        <Content>{sticker.text}</Content>
      </ContentWrapper>
      <ImageWrapper>
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
      </ImageWrapper>
    </Container>
  );
};

export default Sticker;
