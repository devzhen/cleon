import { headers } from 'next/headers';
import 'server-only';

import { BOARD_TYPE, STICKERS_INITIAL_VALUE } from '@/app/constants';

const fetchStickers = async () => {
  let stickers = { ...STICKERS_INITIAL_VALUE };

  try {
    const requestUrl = headers().get('x-url');
    // eslint-disable-next-line no-console
    console.log('URL -', requestUrl);

    const url = new URL(`${requestUrl}api/stickers`);
    url.searchParams.set('board', BOARD_TYPE.all);

    const response = await fetch(url.toString());

    stickers = await response.json();
  } catch (err) {
    // Handle errors
    // eslint-disable-next-line no-console
    console.log((err as Error).message);
  }

  return stickers;
};

export default fetchStickers;
