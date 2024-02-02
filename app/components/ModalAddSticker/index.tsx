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

type ModalAddStickerProps = {
  board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE];
  closeModal: () => void;
  createSticker: (
    // eslint-disable-next-line unused-imports/no-unused-vars
    text: string,
    // eslint-disable-next-line unused-imports/no-unused-vars
    board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE]
  ) => void;
};

const ModalAddSticker = (props: ModalAddStickerProps) => {
  const { closeModal, createSticker, board } = props;

  const [text, setText] = useState("");

  const addStickerHandler = () => {
    createSticker(text, board);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    setText(text);
  };

  return (
    <Background>
      <Container>
        <span>Entrez votre nom</span>
        <TextArea onChange={onChangeHandler} />
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
