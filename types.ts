import { BOARD_TYPE } from './constants';
import { stickers } from './data';

export type Sticker = Omit<typeof stickers.firstId, 'board'> & { board: typeof BOARD_TYPE[keyof typeof BOARD_TYPE] };

export type BoardType = (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE];
