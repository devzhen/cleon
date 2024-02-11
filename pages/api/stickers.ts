import type { NextApiRequest, NextApiResponse } from 'next';
import assocPath from 'ramda/src/assocPath';

import { BOARD_TYPE, STICKERS_INITIAL_VALUE } from '@/constants';
import type { Sticker } from '@/types';

type ResponseData = {
  message: string
} | { 
  [BOARD_TYPE.left]:  Record<string, Sticker>,
  [BOARD_TYPE.right]: Record<string, Sticker>
  }

type BoardType = typeof BOARD_TYPE[keyof typeof BOARD_TYPE];
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if ('board' in req.query === false) {
    res.status(500).json({ message: `The required query param 'board' was not provided` });
  }

  if (!Object.values(BOARD_TYPE).includes(req.query.board as BoardType)) {
    res.status(500).json({ message: `Unsupported 'board' query param` });
  }

  const data = await import('../../data');

  const stickers = Object.values(data.stickers).reduce((acc, item) => {
    return assocPath([item.board, item.id], item, acc);
  }, STICKERS_INITIAL_VALUE);

  res.status(200).json(stickers);
}
