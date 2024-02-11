import { Roboto } from 'next/font/google';
import { headers } from 'next/headers';

import { BOARD_TYPE, STICKERS_INITIAL_VALUE } from '@/constants';

import Header from './components/Header';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';

const font = Roboto({
  subsets: ['latin'],
  weight: '400',
  fallback: ['Times New Roman'],
});

export default async function Home() {
  let stickers = { ...STICKERS_INITIAL_VALUE };

  try {
    const requestUrl = headers().get('x-url');

    console.log(requestUrl);

    const url = new URL(`${requestUrl}api/stickers`);
    url.searchParams.set('board', BOARD_TYPE.all);

    console.log(url);

    const response = await fetch(url.toString());

    stickers = await response.json();

    console.log(stickers);
  } catch (err) {
    // Handle errors
  }

  return (
    <main className={`main ${font.className}`}>
      <Header />
      <LeftSide initialStickers={stickers.left} />
      <RightSide initialStickers={stickers.right} />
    </main>
  );
}
