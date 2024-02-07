"use client";
import { Roboto } from "next/font/google";
import styled, { ThemeProvider } from "styled-components";

import Header from "./components/Header";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import theme from "./theme";

const font = Roboto({
  subsets: ["latin"],
  weight: "400",
  fallback: ["Times New Roman"],
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Main className={font.className}>
        <header>
          <Header />
        </header>
        <LeftSide />
        <RightSide />
      </Main>
    </ThemeProvider>
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
