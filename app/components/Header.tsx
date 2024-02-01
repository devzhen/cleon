"use client";

import styled from "styled-components";

export default function Header() {
  return (
    <div>
      <HeaderTop />
      <HeaderBottom>
        <HeaderLogo>
          <HeaderColumn />
          <HeaderLogoTitleTop>
            <span>clÈon</span>
          </HeaderLogoTitleTop>
          <HeaderLogoTitleBottom>
            <span>l`usine incontournable pour l`automobile de demain</span>
          </HeaderLogoTitleBottom>
        </HeaderLogo>
      </HeaderBottom>
    </div>
  );
}

const HeaderTop = styled.div`
  height: 4px;
  background-color: #363636;
  width: 100%;
`;

const HeaderBottom = styled.div`
  height: 65px;
  background-color: #f0cc46;
  width: 100%;
`;

const HeaderLogo = styled.div`
  width: 600px;
  height: 57px;
`;

const HeaderColumn = styled.div`
  width: 5px;
  height: 44px;
  background-color: white;
  position: relative;
  top: 7px;
  left: 19px;
`;

const HeaderLogoTitleTop = styled.div`
  position: relative;
  top: -39px;
  left: 39px;

  span {
    font-size: 18px;
    color: #fff;
    font-family: Roboto;
    text-transform: uppercase;
  }
`;

const HeaderLogoTitleBottom = styled.div`
  position: relative;
  top: -34px;
  left: 40px;

  span {
    font-size: 18px;
    color: #232323;
    font-family: Roboto-Medium;
    text-transform: uppercase;
  }
`;
