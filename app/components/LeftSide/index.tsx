import Image from "next/image";
import { useRef } from "react";

import { BOARD_TYPE } from "@/app/constants";
import useDraggable from "@/app/hooks/useDraggable.hook";
import useSticker from "@/app/hooks/useSticker.hook";

import ModalAddSticker from "../ModalAddSticker";
import Sticker from "../Sticker";

import {
  Container,
  Cell,
  FloatingWrapper,
  Banner,
  Button,
  LogoWrapper,
} from "./styled";
import useLeftSide from "./useLeftSide.hook";

export default function LeftSide() {
  const currentDragElementRef = useRef<HTMLDivElement>();

  const {
    buttonsWrapperRef,
    correctPositionRelativeToDragContainer,
    correctPositionRelativeToParent,
    detectParentContainer,
    dragArea1Ref,
    dragArea2Ref,
    dragArea3Ref,
    dragContainerRef,
    initDragAreas,
    lastBannerWrapperRef,
    leftBannerWrapperRef,
    logoWrapperRef,
  } = useLeftSide({
    currentDragElementRef,
  });

  const { onMouseMove, onMouseDown } = useDraggable({
    correctPositionRelativeToDragContainer,
    correctPositionRelativeToParent,
    currentDragElementRef,
    detectParentContainer,
    dragContainerRef,
    initDragAreas,
  });

  const {
    stickers,
    closeModal,
    isModalOpen,
    setModalVisibility,
    createSticker,
  } = useSticker();

  return (
    <>
      <Container
        className="sticker-container"
        onMouseMove={onMouseMove as VoidFunction}
        ref={dragContainerRef}
      >
        <div className="drag-area" ref={dragArea1Ref} />
        <div className="drag-area" ref={dragArea2Ref} />
        <div className="drag-area" ref={dragArea3Ref} />
        <Cell>
          <FloatingWrapper
            className="floating-wrapper"
            $paddingTop={80}
            ref={leftBannerWrapperRef}
          >
            <Banner $marginLeft={10}>
              <Image
                src="/banner1.jpeg"
                width={185}
                height={132}
                alt="Banner 1"
                priority
                draggable={false}
              />
            </Banner>
            <Banner $marginTop={10} $marginLeft={10}>
              <Image
                src="/banner2.jpeg"
                width={185}
                height={132}
                alt="Banner 2"
                draggable={false}
              />
            </Banner>
            <Banner $marginTop={10} $marginLeft={10}>
              <Image
                src="/banner3.jpeg"
                width={185}
                height={132}
                alt="Banner 3"
                draggable={false}
              />
            </Banner>
          </FloatingWrapper>
        </Cell>
        <Cell $justifyContent="center" $alignItems="start">
          <FloatingWrapper className="floating-wrapper" ref={logoWrapperRef}>
            <LogoWrapper>
              <Image
                src="/gerb-1.png"
                width={39}
                height={52}
                alt="Picture of the author"
                draggable={false}
              />
              <span>sÈcuritÈ</span>
            </LogoWrapper>
          </FloatingWrapper>
        </Cell>
        <Cell $alignItems="start" $justifyContent="flex-end">
          <FloatingWrapper className="floating-wrapper" ref={buttonsWrapperRef}>
            <div className="buttons-wrapper">
              <Button onClick={setModalVisibility(true)}>+</Button>
              <Button $marginTop={10}>-</Button>
            </div>
          </FloatingWrapper>
        </Cell>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell $alignItems="end" $justifyContent="flex-end">
          <FloatingWrapper
            className="floating-wrapper"
            ref={lastBannerWrapperRef}
          >
            <Banner
              $marginRight={10}
              $marginBottom={10}
              $width={129}
              $height={188}
            >
              <Image
                src="/banner4.jpeg"
                width={129}
                height={188}
                alt="Banner 4"
                draggable={false}
              />
            </Banner>
          </FloatingWrapper>
        </Cell>
        {stickers.map((item) => (
          <Sticker
            onMouseDown={onMouseDown as VoidFunction}
            key={item.id}
            sticker={item}
            editSticker={() => {}}
          />
        ))}
      </Container>
      {isModalOpen && (
        <ModalAddSticker
          closeModal={closeModal}
          createSticker={createSticker}
          board={BOARD_TYPE.left}
        />
      )}
    </>
  );
}
