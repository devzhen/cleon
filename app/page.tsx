import { Roboto } from "next/font/google";

import Header from "./components/Header";
import LeftSide from "./components/LeftSide";

const font = Roboto({
  subsets: ["latin"],
  weight: "400",
  fallback: ["Times New Roman"],
});

export default function Home() {
  return (
    <main className={`main ${font.className}`}>
      <Header />
      <LeftSide />
      {/* <RightSide /> */}
    </main>
  );
}
