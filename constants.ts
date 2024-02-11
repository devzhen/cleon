export const DEFAULT_STICKER_POS = {
  top: 100,
  left: 220,
} as const;

export const BOARD_TYPE = {
  left: 'left',
  right: 'right',
  all: 'all',
} as const;

export const STICKERS_INITIAL_VALUE = { [BOARD_TYPE.left]: {}, [BOARD_TYPE.right]: {}};
