"use client";
import { Roboto } from "next/font/google";

import styled from "styled-components";

import Header from "./components/Header";
import LeftSide from "./components/LeftSide";

const font = Roboto({
  subsets: ["latin"],
  weight: "400",
  fallback: ["Times New Roman"],
});

export default function Home() {
  return (
    <Main className={font.className}>
      <header>
        <Header />
      </header>
      <LeftSide />
    </Main>
  );
}

const Main = styled.main`
  display: grid;
  grid-template-rows: 72px 1fr;
  grid-template-columns: 638px 1fr;
  height: 100dvh;
  width: 100%;

  header {
    grid-column: 2 span;
    height: 66px;
    width: 100%;
  }
`;
