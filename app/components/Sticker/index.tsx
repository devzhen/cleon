import { parseISO, format } from "date-fns";
import Image from "next/image";

import { Sticker } from "@/app/data";

import {
  Container,
  Date,
  Content,
  ContentWrapper,
  ImageWrapper,
} from "./styled";

type StickerProps = {
  sticker: Sticker;
  onMouseDown: VoidFunction;
  editSticker: (e: MouseEvent) => void;
  isDeleteMode: boolean;
  removeSticker: () => void;
  zIndex: number;
};

const Sticker = (props: StickerProps) => {
  const {
    sticker,
    onMouseDown,
    editSticker,
    isDeleteMode,
    removeSticker,
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
