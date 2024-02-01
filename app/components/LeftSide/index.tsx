import Image from "next/image";

import {
  Container,
  Cell,
  FloatingWrapper,
  Banner,
  Button,
  LogoWrapper,
  StickerElement,
} from "./styled";
import useLeftSide from "./useLeftSide.hook";
import useSticker from "./useSticker.hook";

export default function LeftSide() {
  const {
    dragContainerRef,
    dragArea1Ref,
    dragArea2Ref,
    dragArea3Ref,
    leftBannerWrapperRef,
    logoWrapperRef,
    buttonsWrapperRef,
    lastBannerWrapperRef,
    onMouseMove,
    onMouseDown,
  } = useLeftSide();

  const { stickers, addSticker } = useSticker();

  return (
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
            <Button onClick={addSticker}>+</Button>
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
        <StickerElement
          onMouseDown={onMouseDown as VoidFunction}
          key={item.id}
          $top={item.top}
          $left={item.left}
        />
      ))}
    </Container>
  );
}
