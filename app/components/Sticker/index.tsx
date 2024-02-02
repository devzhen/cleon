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
  editSticker: () => void;
};

const Sticker = (props: StickerProps) => {
  const { sticker, onMouseDown, editSticker } = props;

  return (
    <Container
      onMouseDown={onMouseDown}
      $top={sticker.top}
      $left={sticker.left}
    >
      <Date>Date</Date>
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
          onClick={editSticker}
        />
      </ImageWrapper>
    </Container>
  );
};

export default Sticker;
