import { NextRequest } from 'next/server';
import assocPath from 'ramda/src/assocPath';

import { BOARD_TYPE, STICKERS_INITIAL_VALUE } from '@/app/constants';
import type { BoardType } from '@/app/types';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const board = searchParams.get('board');

  if (!board) {
    return new Response(`The required query param 'board' was not provided`, {
      status: 500,
    });
  }

  if (!Object.values(BOARD_TYPE).includes(board as BoardType)) {
    return new Response(`Unsupported 'board' query param`, {
      status: 500,
    });
  }

  const data = await import('@/app/data');

  const stickers = Object.values(data.stickers).reduce((acc, item) => {
    return assocPath([item.board, item.id], item, acc);
  }, STICKERS_INITIAL_VALUE);

  return Response.json(stickers);
}
