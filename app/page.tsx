"use client";

import styled from "styled-components";

import Header from "./components/Header";
import LeftSide from "./components/LeftSide";

export default function Home() {
  return (
    <Main>
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
