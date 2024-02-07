import styled from "styled-components";

export const Container = styled.div<{
  $top?: number;
  $left?: number;
  $zIndex?: number;
}>`
  position: absolute;
  width: 178px;
  height: 181px;
  padding: 8px; 
  background-color: ${(props) => props.theme.colors.modalBackground};
  border: 1px solid white;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.18);
  z-index: 2;
  cursor: pointer;
  user-select: none;

  ${(props) => props.$top && `top: ${props.$top}px`};
  ${(props) => props.$left && `left: ${props.$left}px`};
  ${(props) => props.$zIndex && `z-index: ${props.$zIndex}`};
`;

export const Date = styled.div`
  color: ${(props) => props.theme.colors.dateColor};
  font-size: 10px;
  margin-left: 7px;
  margin-bottom: 5px;
`;

export const ContentWrapper = styled.div`
  height: 124px;
  border: 1px solid ${(props) => props.theme.colors.textAreaBorder};
  overflow: hidden;
  outline: none;
`;

export const Content = styled.span`
  color: ${(props) => props.theme.colors.textAreaColor};
  font-size: 13px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  line-height: 1.5;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  img {
    width: 13px;
    height: 13px;
    margin-top: 10px;
    cursor: pointer;
  }
`;
