import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  min-width: 638px;
  max-width: 638px;
  height: calc(100vh - 72px);
  border: 3px solid #eb6529;
  z-index: 2;

  .buttons-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 22px 16px 0 0;
  }

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
  background-color: #f0cc46;
  cursor: pointer;
  color: #fff;
  user-select: none;
  font-size: 30px;
  font-weight: 400;
  line-height: 20px;
  text-transform: uppercase;
  border: none;
  outline: none;

  &:active {
    box-shadow: 2px 2px 5px #f0cc46;
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
    color: #eb6529;
    font-family: "Roboto-Medium";
    text-transform: uppercase;
    font-size: 28px;
  }
`;

export const StickerElement = styled.div<{
  $top?: number;
  $left?: number;
}>`
  position: absolute;
  width: 178px;
  height: 181px;
  background-color: #fff8c8;
  border: 1px solid white;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.18);
  z-index: 2;
  cursor: pointer;

  ${(props) => props.$top && `top: ${props.$top}px`};
  ${(props) => props.$left && `left: ${props.$left}px`};
`;
