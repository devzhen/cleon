import { v4 as uuid } from "uuid";

import { BOARD_TYPE } from "./constants";

const firstId = uuid();
const secondId = uuid();
const thirdId = uuid();
const fourthId = uuid();

export const stickers = {
  [firstId]: {
    id: firstId,
    top: 110,
    left: 230,
    createdAt: '2024-02-03T06:03:55.615Z',
    text: 'Draggable element 1',
    board: BOARD_TYPE.left,
    zIndex: 1,
  },
  [secondId]: {
    id: secondId,
    top: 110,
    left: 230,
    createdAt: '2024-02-03T04:02:40.615Z',
    text: 'Draggable element 2',
    board: BOARD_TYPE.right,
    zIndex: 1,
  },
  [thirdId]: {
    id: thirdId,
    top: 566,
    left: 544,
    createdAt: '2024-02-03T07:10:11.615Z',
    text: 'Draggable element 3',
    board: BOARD_TYPE.right,
    zIndex: 2,
  },
  [fourthId]: {
    id: fourthId,
    top: 449,
    left: 963,
    createdAt: '2024-02-03T07:10:11.615Z',
    text: 'Draggable element 4',
    board: BOARD_TYPE.right,
    zIndex: 3,
  },
};
