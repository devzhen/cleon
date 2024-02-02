import { v4 as uuid } from "uuid";

import { BOARD_TYPE } from "./constants";

export const stickers = [
  {
    id: uuid(),
    top: 110,
    left: 230,
    createdAt: new Date().toISOString(),
    text: 'test draggable element',
    board: BOARD_TYPE.left
  }
];

export type Sticker = Omit<typeof stickers[0], 'board'> & { board: typeof BOARD_TYPE[keyof typeof BOARD_TYPE] };

