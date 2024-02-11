import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

import { Sticker, BoardType } from '@/types';

import styles from './ModalAddSticker.module.css';

type ModalAddStickerProps = {
  board: BoardType;
  closeModal: () => void;
  createSticker: ({
    text,
    board,
    id,
  }: {
    text: string;
    board: BoardType;
    id: string | undefined;
  }) => void;
  sticker: Sticker | null;
};

const ModalAddSticker = (props: ModalAddStickerProps) => {
  const { closeModal, createSticker, board, sticker } = props;

  const [text, setText] = useState(sticker?.text || '');

  const addStickerHandler = () => {
    createSticker({ text, board, id: sticker?.id });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    setText(text);
  };

  const imageCheck = (
    <Image
      src="/check.png"
      width={52}
      height={52}
      alt="Picture of the author"
      draggable={false}
      onClick={addStickerHandler}
    />
  );

  return (
    <div className={`${styles.background} modal-bg`}>
      <div className={styles.container}>
        <span>Entrez votre nom</span>
        <textarea onChange={onChangeHandler} value={text} />
        <div data-role="image-wrapper">
          <Image
            src="/cross.png"
            width={52}
            height={52}
            alt="Picture of the author"
            draggable={false}
            onClick={closeModal}
          />
          {!text && <div data-role="blur-wrapper">{imageCheck}</div>}
          {text && <div>{imageCheck}</div>}
        </div>
      </div>
    </div>
  );
};

export default ModalAddSticker;
