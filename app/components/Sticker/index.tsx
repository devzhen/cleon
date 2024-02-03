import Image from "next/image";
import { parseISO, format } from "date-fns";

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
};

const Sticker = (props: StickerProps) => {
  const { sticker, onMouseDown, editSticker } = props;

  const date = parseISO(sticker.createdAt);
  const dateFormatted = format(date, "LLLL d, yyyy");

  return (
    <Container
      onMouseDown={onMouseDown}
      $top={sticker.top}
      $left={sticker.left}
      className="sticker"
    >
      <Date>{dateFormatted}</Date>
      <ContentWrapper>
        <Content>{sticker.text}</Content>
      </ContentWrapper>
      <ImageWrapper>
        <Image
          src="/reg.png"
          width={13}
          height={13}
          alt="Picture of the author"
          draggable={false}
          onClick={editSticker as VoidFunction}
        />
      </ImageWrapper>
    </Container>
  );
};

export default Sticker;
