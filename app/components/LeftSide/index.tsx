import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import { BOARD_TYPE, DEFAULT_COORDS } from "@/app/constants";
import { stickers as stickersArray } from "@/app/data";
import useModal from "@/app/hooks/useModal.hook";
import getCoords from "@/app/utils/getCoords";
import isPointInPath from "@/app/utils/isPointInPath";

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

export default function LeftSide() {
  const currentDragElementRef = useRef<HTMLDivElement>();

  // Current draggable sticker
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

  const clickOffsetRef = useRef({ x: 0, y: 0 });

  const [isDragStarted, setIsDragStarted] = useState(false);
  const isDragStartedRef = useRef(isDragStarted);

  const [stickers, setStickers] = useState<Sticker[]>(
    Object.values(stickersArray)
  );

  const { isModalOpen, setModalVisibility, closeModal } = useModal();

  const createSticker = (
    text: string,
    board: (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE]
  ) => {
    const sticker = {
      id: uuid(),
      top: DEFAULT_COORDS.top,
      left: DEFAULT_COORDS.left,
      createdAt: new Date().toISOString(),
      text,
      board,
    };

    setStickers((prev) => [...prev, sticker]);
  };

  /**
   * Mouse down handler.
   */
  const onMouseDown = (e: MouseEvent) => {
    if (!isDragStartedRef.current) {
      isDragStartedRef.current = true;
      setIsDragStarted(true);
    }

    currentDragElementRef.current = (e.target as HTMLDivElement)
      ?.parentElement as HTMLDivElement;
    currentDragElementRef.current.style.cursor = "move";

    const offsetX =
      e.pageX - currentDragElementRef.current.getBoundingClientRect().left;

    const offsetY =
      e.pageY - currentDragElementRef.current.getBoundingClientRect().top;

    clickOffsetRef.current.x = offsetX;
    clickOffsetRef.current.y = offsetY;
  };

  /**
   * Mouse move handler.
   */
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragStartedRef.current || !currentDragElementRef.current) {
      return;
    }

    if (currentDragElementRef) {
      const { left: parentLeft, top: parentTop } = (
        dragContainerRef.current as HTMLDivElement
      ).getBoundingClientRect();

      const offsetX = e.pageX - parentLeft - clickOffsetRef.current.x;
      currentDragElementRef.current.style.left = `${Math.max(0, offsetX)}px`;

      const offsetY = e.pageY - parentTop - clickOffsetRef.current.y;
      currentDragElementRef.current.style.top = `${Math.max(0, offsetY)}px`;

      console.log(offsetX, offsetY);

      detectParentContainer();

      correctPositionRelativeToParent();

      correctPositionRelativeToDragContainer();
    }
  };

  /**
   * Lifecycle
   */
  useEffect(() => {
    /**
     * Mouse up handler
     */
    const onMouseUp = () => {
      if (currentDragElementRef.current) {
        currentDragElementRef.current.style.cursor = "pointer";
      }

      if (isDragStartedRef.current) {
        isDragStartedRef.current = false;

        setIsDragStarted(false);
      }
    };

    document.addEventListener("mouseup", onMouseUp);

    initDragAreas();

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
