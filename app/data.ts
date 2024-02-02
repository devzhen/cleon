import { v4 as uuid } from "uuid";

import { BOARD_TYPE } from "./constants";

const firstId = uuid();

export const stickers = {
  [firstId]: {
    id: firstId,
    top: 110,
    left: 230,
    createdAt: new Date().toISOString(),
    text: 'test draggable element',
    board: BOARD_TYPE.left
  }
};

export type Sticker = Omit<typeof stickers.firstId, 'board'> & { board: typeof BOARD_TYPE[keyof typeof BOARD_TYPE] };
