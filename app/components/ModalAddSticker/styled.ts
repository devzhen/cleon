import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
`;

export const Container = styled.div`
  width: 421px;
  height: 428px;
  padding: 18px 14px 14px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff8c8;
  border: 1px solid white;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.18);
  z-index: 10;
`;

export const BlurWrapper = styled.div<{ $isDisabled: boolean}>`
  ${(props) => props.$isDisabled && `opacity: 0.5`};
  ${(props) => props.$isDisabled && `pointer-events: none`};
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  img {
    width: 52px;
    height: 52px;
    cursor: pointer;
  }

  img:nth-child(1) {
    margin-right: 10px;
  }
`;

export const TextArea = styled.textarea`
  width: 393px;
  height: 290px;
  background-color: #fffde6;
  border: 1px solid #dfe2e7;
  color: #2e2e2e;
  font-size: 18px;
  padding: 13px;
  line-height: 1.2;
  resize: none;
  overflow: hidden;
  outline: none;
`;