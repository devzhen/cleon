import styled from "styled-components";

export const Container = styled.div<{
  $marginTop?: number;
  $marginRight?: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${(props) => props.$marginTop && `margin-top: ${props.$marginTop}px`};
  ${(props) => props.$marginRight && `margin-right: ${props.$marginRight}px`};
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
