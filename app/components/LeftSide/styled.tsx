import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  min-width: 638px;
  max-width: 638px;
  min-height: 863px;
  height: calc(100vh - 72px);
  border: 3px solid ${(props) => props.theme.colors.activeBoard};
  background-color: ${(props) => props.theme.colors.boardBackground};
  z-index: 2;

  .drag-area {
    position: absolute;
  }
`;

export const Cell = styled.div<{
  $alignItems?: string;
  $justifyContent?: string;
}>`
  display: flex;

  ${(props) => props.$alignItems && `align-items: ${props.$alignItems}`};
  ${(props) =>
    props.$justifyContent && `justify-content: ${props.$justifyContent}`};
`;

export const FloatingWrapper = styled.div<{
  $paddingTop?: number;
}>`
  width: fit-content;
  height: fit-content;

  ${(props) => props.$paddingTop && `padding-top: ${props.$paddingTop}px`};
`;

export const Banner = styled.div<{
  $marginTop?: number;
  $marginLeft?: number;
  $marginRight?: number;
  $marginBottom?: number;
  $width?: number;
  $height?: number;
}>`
  width: ${(props) => props.$width || 185}px;
  height: ${(props) => props.$height || 132}px;
  user-select: none;

  ${(props) => props.$marginTop && `margin-top: ${props.$marginTop}px`};
  ${(props) => props.$marginLeft && `margin-left: ${props.$marginLeft}px`};
  ${(props) => props.$marginRight && `margin-right: ${props.$marginRight}px`};
  ${(props) =>
    props.$marginBottom && `margin-bottom: ${props.$marginBottom}px`};

  img {
    cursor: pointer;
  }
`;

export const Button = styled.button<{
  $marginTop?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 57px;
  height: 31px;
  background-color: ${(props) => props.theme.colors.mainBackground};
  cursor: pointer;
  color: ${(props) => props.theme.colors.white};
  user-select: none;
  font-size: 30px;
  font-weight: 400;
  line-height: 20px;
  text-transform: uppercase;
  border: none;
  outline: none;

  &:active {
    box-shadow: 2px 2px 5px ${(props) => props.theme.colors.mainBackground};
  }

  ${(props) => props.$marginTop && `margin-top: ${props.$marginTop}px`};
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  user-select: none;

  span {
    margin-left: 8px;
    color: ${(props) => props.theme.colors.activeBoard};
    text-transform: uppercase;
    font-size: 28px;
  }
`;
