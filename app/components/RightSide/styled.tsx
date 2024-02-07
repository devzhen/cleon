import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 59px 185px 1fr 205px;
  grid-template-columns: 1fr;
  height: calc(100vh - 72px);
  min-width: 1152px;
  min-height: 863px;
  border: 3px solid ${(props) => props.theme.colors.notActiveBoard};
  margin-left: 3px;
  background-color: ${(props) => props.theme.colors.boardBackground};
  z-index: 2;

  img {
    cursor: pointer;
  }

  .drag-area {
    position: absolute;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  span {
    margin-left: 10px;
    color: ${(props) => props.theme.colors.headerRightSide};
    font-size: 28px;
    text-transform: uppercase;
  }
`;

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: start;

  div:nth-child(2) > img:nth-child(2) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const BannersRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 10px;

  div {
    display: flex;
    align-items: center;
    width: content-fit;

    img:nth-child(2) {
      margin-left: 10px;
    }
  }
`;

export const FloatingWrapper = styled.div<{
  $paddingTop?: number;
}>`
  width: fit-content;
  height: fit-content;

  ${(props) => props.$paddingTop && `padding-top: ${props.$paddingTop}px`};
`;
