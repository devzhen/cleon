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
  background-color: ${(props) => props.theme.colors.headerTopBackground};
  width: 100%;
`;

const HeaderBottom = styled.div`
  height: 65px;
  background-color: ${(props) => props.theme.colors.mainBackground};
  width: 100%;
`;

const HeaderLogo = styled.div`
  width: 600px;
  height: 57px;
`;

const HeaderColumn = styled.div`
  width: 5px;
  height: 44px;
  background-color: ${(props) => props.theme.colors.white};
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
    color: ${(props) => props.theme.colors.white};
    text-transform: uppercase;
  }
`;

const HeaderLogoTitleBottom = styled.div`
  position: relative;
  top: -34px;
  left: 40px;

  span {
    font-size: 18px;
    color: ${(props) => props.theme.colors.headerLogoTitle};
    text-transform: uppercase;
  }
`;
