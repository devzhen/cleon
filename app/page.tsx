import { Roboto } from 'next/font/google';

import fetchStickers from './api/stickers/fetchStickers';
import Footer from './components/Footer';
import Header from './components/Header';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';

const font = Roboto({
  subsets: ['latin'],
  weight: '400',
  fallback: ['Times New Roman'],
});

export default async function Home() {
  const stickers = await fetchStickers();

  return (
    <main className={`main ${font.className}`}>
      <Header />
      <LeftSide initialStickers={stickers.left} />
      <RightSide initialStickers={stickers.right} />
      <Footer />
    </main>
  );
}
