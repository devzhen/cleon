import Image from "next/image";
import { ChangeEvent, useState } from "react";

import { BOARD_TYPE } from "@/app/constants";

import {
  Background,
  Container,
  TextArea,
  ImageWrapper,
  BlurWrapper,
} from "./styled";
import { Sticker } from "@/app/data";

type ModalAddStickerProps = {
  board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE];
  closeModal: () => void;
  createSticker: ({
    text,
    board,
    id,
  }: {
    text: string;
    board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE];
    id: string | undefined;
  }) => void;
  sticker: Sticker | null;
};

const ModalAddSticker = (props: ModalAddStickerProps) => {
  const { closeModal, createSticker, board, sticker } = props;

  const [text, setText] = useState(sticker?.text || "");

  const addStickerHandler = () => {
    createSticker({ text, board, id: sticker?.id });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    setText(text);
  };

  return (
    <Background>
      <Container>
        <span>Entrez votre nom</span>
        <TextArea onChange={onChangeHandler} value={text} />
        <ImageWrapper>
          <Image
            src="/cross.png"
            width={52}
            height={52}
            alt="Picture of the author"
            draggable={false}
            onClick={closeModal}
          />
          <BlurWrapper $isDisabled={!text}>
            <Image
              src="/check.png"
              width={52}
              height={52}
              alt="Picture of the author"
              draggable={false}
              onClick={addStickerHandler}
            />
          </BlurWrapper>
        </ImageWrapper>
      </Container>
    </Background>
  );
};

export default ModalAddSticker;
