import { v4 as uuid } from "uuid";

import { BOARD_TYPE } from "./constants";

const firstId = uuid();
const secondId = uuid();

export const stickers = {
  [firstId]: {
    id: firstId,
    top: 110,
    left: 230,
    createdAt: '2024-02-03T04:02:55.615Z',
    text: 'Draggable element 1',
    board: BOARD_TYPE.left
  },
  [secondId]: {
    id: firstId,
    top: 110,
    left: 230,
    createdAt: '2024-02-03T04:02:55.615Z',
    text: 'Draggable element 2',
    board: BOARD_TYPE.right
  }
};

export type Sticker = Omit<typeof stickers.firstId, 'board'> & { board: typeof BOARD_TYPE[keyof typeof BOARD_TYPE] };
