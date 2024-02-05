import Image from "next/image";
import { useRef } from "react";

import { BOARD_TYPE } from "@/app/constants";
import useDraggableAreas from "@/app/hooks/useDraggableAreas";
import useSticker from "@/app/hooks/useSticker";
import getCoords from "@/app/utils/getCoords";
import isPointInPath from "@/app/utils/isPointInPath";

import ButtonsAddDelete from "../ButtonsAddDelete";
import ModalAddSticker from "../ModalAddSticker";
import StickerComponent from "../Sticker";

import {
  Container,
  Cell,
  FloatingWrapper,
  Banner,
  LogoWrapper,
} from "./styled";

export default function LeftSide() {
  // Current draggable sticker
  const currentDragElementRef = useRef<HTMLDivElement>();

  // Current draggable sticker's parent
  const currentDragElementParentRef = useRef<HTMLDivElement>();

  // Drag containers
  const dragContainerRef = useRef<HTMLDivElement>(null);
  const dragArea1Ref = useRef<HTMLDivElement>(null);
  const dragArea2Ref = useRef<HTMLDivElement>(null);
  const dragArea3Ref = useRef<HTMLDivElement>(null);

  // Banners, logo, buttons
  const leftBannerWrapperRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const buttonsWrapperRef = useRef<HTMLDivElement>(null);
  const lastBannerWrapperRef = useRef<HTMLDivElement>(null);

  /**
   * Init draggable areas
   */
  const initDragAreas = () => {
    if (
      !dragContainerRef.current ||
      !dragArea1Ref.current ||
      !dragArea2Ref.current ||
      !dragArea3Ref.current ||
      !leftBannerWrapperRef.current ||
      !logoWrapperRef.current ||
      !buttonsWrapperRef.current ||
      !lastBannerWrapperRef.current
    ) {
      return;
    }

    const dragContainerRect = dragContainerRef.current.getBoundingClientRect();

    const leftBannerWrapperRect =
      leftBannerWrapperRef.current.getBoundingClientRect();

    const logoWrapperRect = logoWrapperRef.current.getBoundingClientRect();

    const buttonsWrapperRect =
      buttonsWrapperRef.current.getBoundingClientRect();

    const lastBannerWrapperRect =
      lastBannerWrapperRef.current.getBoundingClientRect();

    const BORDER_WIDTH = 3;

    const dragArea1Rect = {
      left: leftBannerWrapperRect.width,
      top: logoWrapperRect.height,
      width:
        dragContainerRect.width -
        leftBannerWrapperRect.width -
        buttonsWrapperRect.width -
        BORDER_WIDTH * 2,
      height:
        dragContainerRect.height -
        (logoWrapperRect.height +
          lastBannerWrapperRect.height +
          BORDER_WIDTH * 2),
    };

    dragArea1Ref.current.style.top = `${dragArea1Rect.top}px`;
    dragArea1Ref.current.style.left = `${dragArea1Rect.left}px`;
    dragArea1Ref.current.style.width = `${dragArea1Rect.width}px`;
    dragArea1Ref.current.style.height = `${dragArea1Rect.height}px`;

    const dragArea2Rect = {
      left: leftBannerWrapperRect.width,
      top: buttonsWrapperRect.height,
      width:
        dragContainerRect.width -
        leftBannerWrapperRect.width -
        BORDER_WIDTH * 2,
      height:
        dragContainerRect.height -
        (buttonsWrapperRect.height +
          lastBannerWrapperRect.height +
          BORDER_WIDTH * 2),
    };

    dragArea2Ref.current.style.top = `${dragArea2Rect.top}px`;
    dragArea2Ref.current.style.left = `${dragArea2Rect.left}px`;
    dragArea2Ref.current.style.width = `${dragArea2Rect.width}px`;
    dragArea2Ref.current.style.height = `${dragArea2Rect.height}px`;

    const dragArea3Rect = {
      left: 0,
      top: leftBannerWrapperRect.height,
      width:
        dragContainerRect.width -
        lastBannerWrapperRect.width -
        BORDER_WIDTH * 2,
      height:
        dragContainerRect.height -
        (leftBannerWrapperRect.height + BORDER_WIDTH * 2),
    };

    dragArea3Ref.current.style.top = `${dragArea3Rect.top}px`;
    dragArea3Ref.current.style.left = `${dragArea3Rect.left}px`;
    dragArea3Ref.current.style.width = `${dragArea3Rect.width}px`;
    dragArea3Ref.current.style.height = `${dragArea3Rect.height}px`;

    currentDragElementParentRef.current = dragArea2Ref.current;
  };

  /**
   * Detect a sticker's parent container
   */
  const detectParentContainer = () => {
    if (
      !dragArea1Ref.current ||
      !dragArea2Ref.current ||
      !dragArea3Ref.current ||
      !leftBannerWrapperRef.current ||
      !logoWrapperRef.current ||
      !buttonsWrapperRef.current ||
      !lastBannerWrapperRef.current
    ) {
      return;
    }

    const stickerCoords = getCoords(
      currentDragElementRef.current as HTMLDivElement
    );

    const dragArea1Coords = getCoords(dragArea1Ref.current);
    const dragArea2Coords = getCoords(dragArea2Ref.current);
    const dragArea3Coords = getCoords(dragArea3Ref.current);

    // The drag area 1
    if (currentDragElementParentRef.current === dragArea1Ref.current) {
      // Attach to the drag area 2
      if (
        stickerCoords.top > dragArea2Coords.top &&
        !isPointInPath(
          leftBannerWrapperRef.current,
          stickerCoords.left,
          stickerCoords.top
        ) &&
        !isPointInPath(
          buttonsWrapperRef.current,
          stickerCoords.right,
          stickerCoords.top
        )
      ) {
        currentDragElementParentRef.current = dragArea2Ref.current;
      }
    }

    // The drag area 2
    if (currentDragElementParentRef.current === dragArea2Ref.current) {
      // Attach to the drag area 3
      if (
        stickerCoords.top > dragArea3Coords.top &&
        stickerCoords.left > dragArea3Coords.left &&
        stickerCoords.right < dragArea3Coords.right &&
        stickerCoords.bottom < dragArea3Coords.bottom
      ) {
        currentDragElementParentRef.current = dragArea3Ref.current;
      }

      // Attach to the drag area 1
      if (
        stickerCoords.top < dragArea2Coords.top &&
        stickerCoords.right <= dragArea1Coords.right
      ) {
        currentDragElementParentRef.current = dragArea1Ref.current;
      }
    }

    // The drag area 3
    if (currentDragElementParentRef.current === dragArea3Ref.current) {
      // If move to top, attach to the drag area 2
      if (
        stickerCoords.top < dragArea3Coords.top &&
        stickerCoords.left > dragArea3Coords.left &&
        stickerCoords.right < dragArea3Coords.right &&
        stickerCoords.bottom < dragArea3Coords.bottom &&
        !isPointInPath(
          leftBannerWrapperRef.current,
          stickerCoords.left,
          stickerCoords.top
        )
      ) {
        currentDragElementParentRef.current = dragArea2Ref.current;
      }

      // If move to right, attach to the drag area 2
      if (
        stickerCoords.top > dragArea3Coords.top &&
        stickerCoords.left > dragArea3Coords.left &&
        stickerCoords.right > dragArea3Coords.right &&
        stickerCoords.bottom < dragArea3Coords.bottom &&
        !isPointInPath(
          lastBannerWrapperRef.current,
          stickerCoords.right,
          stickerCoords.bottom
        )
      ) {
        currentDragElementParentRef.current = dragArea2Ref.current;
      }

      // If move to right, attach to the drag area 2
      if (
        stickerCoords.top <= dragArea3Coords.top &&
        stickerCoords.left > dragArea3Coords.left &&
        stickerCoords.right >= dragArea3Coords.right &&
        stickerCoords.bottom < dragArea3Coords.bottom &&
        isPointInPath(
          lastBannerWrapperRef.current,
          stickerCoords.right,
          stickerCoords.bottom
        )
      ) {
        currentDragElementParentRef.current = dragArea2Ref.current;
      }
    }
  };

  /**
   * Correct a sticker's position relative to a parent
   */
  const correctPositionRelativeToParent = () => {
    if (
      !currentDragElementRef.current ||
      !currentDragElementParentRef.current
    ) {
      return;
    }

    const stickerCoords = getCoords(
      currentDragElementRef.current as HTMLDivElement
    );

    const parentCoords = getCoords(
      currentDragElementParentRef.current as HTMLDivElement
    );

    if (stickerCoords.left < parentCoords.left) {
      currentDragElementRef.current.style.left = `${currentDragElementParentRef.current.offsetLeft}px`;
    }

    if (stickerCoords.top < parentCoords.top) {
      currentDragElementRef.current.style.top = `${currentDragElementParentRef.current.offsetTop}px`;
    }

    if (stickerCoords.left + stickerCoords.width > parentCoords.right) {
      currentDragElementRef.current.style.left = `${
        currentDragElementParentRef.current.offsetLeft +
        parentCoords.width -
        stickerCoords.width
      }px`;
    }

    if (stickerCoords.top + stickerCoords.width > parentCoords.bottom) {
      currentDragElementRef.current.style.top = `${
        currentDragElementParentRef.current?.offsetTop +
        parentCoords.height -
        stickerCoords.height
      }px`;
    }
  };

  /**
   * Correct a sticker's position relative to a drag container
   */
  const correctPositionRelativeToDragContainer = () => {
    if (!currentDragElementRef.current || !dragContainerRef.current) {
      return;
    }

    const stickerCoords = getCoords(
      currentDragElementRef.current as HTMLDivElement
    );

    const dragContainerCoords = getCoords(
      dragContainerRef.current as HTMLDivElement
    );

    if (stickerCoords.left < dragContainerCoords.left) {
      currentDragElementRef.current.style.left = `${0}px`;
    }

    if (stickerCoords.top < dragContainerCoords.top) {
      currentDragElementRef.current.style.top = `${0}px`;
    }

    if (stickerCoords.left + stickerCoords.width > dragContainerCoords.right) {
      currentDragElementRef.current.style.left = `${
        dragContainerCoords.width - stickerCoords.width
      }px`;
    }

    if (stickerCoords.top + stickerCoords.width > dragContainerCoords.bottom) {
      currentDragElementRef.current.style.top = `${
        dragContainerCoords.height - stickerCoords.height
      }px`;
    }
  };

  /**
   * Use draggable areas hook
   */
  const { onMouseDown, onMouseMove } = useDraggableAreas({
    currentDragElementRef,
    dragContainerRef,
    onMountHandler: initDragAreas,
    onMouseMoveHandler: () => {
      detectParentContainer();

      correctPositionRelativeToParent();

      correctPositionRelativeToDragContainer();
    },
    onMouseDownHandler: () => {},
  });

  /**
   * Use sticker hook
   */
  const {
    closeModalHandler,
    createSticker,
    editSticker,
    editedSticker,
    isModalOpen,
    setModalVisibility,
    stickers,
    isDeleteMode,
    toggleDeleteMode,
    removeSticker,
  } = useSticker({
    board: BOARD_TYPE.left,
  });

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
                priority
              />
            </Banner>
            <Banner $marginTop={10} $marginLeft={10}>
              <Image
                src="/banner3.jpeg"
                width={185}
                height={132}
                alt="Banner 3"
                draggable={false}
                priority
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
            <ButtonsAddDelete
              add={setModalVisibility(true)}
              remove={toggleDeleteMode}
              marginTop={22}
              marginRight={16}
            />
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
          <StickerComponent
            onMouseDown={onMouseDown as VoidFunction}
            key={item.id}
            sticker={item}
            editSticker={editSticker(item)}
            isDeleteMode={isDeleteMode}
            removeSticker={removeSticker(item.id)}
          />
        ))}
      </Container>
      {isModalOpen && (
        <ModalAddSticker
          closeModal={closeModalHandler}
          createSticker={createSticker}
          board={BOARD_TYPE.left}
          sticker={editedSticker}
        />
      )}
    </>
  );
}
