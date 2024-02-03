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

import { Container, Header, ButtonsRow, BannersRow } from "./styled";

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
  const dragArea4Ref = useRef<HTMLDivElement>(null);
  const dragArea5Ref = useRef<HTMLDivElement>(null);

  // Banners, logos, images
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonAddDeleteRef = useRef<HTMLDivElement>(null);
  const topImagesRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const bottomLeftImagesRef = useRef<HTMLDivElement>(null);
  const bottomRightImagesRef = useRef<HTMLDivElement>(null);

  /**
   * Init draggable areas
   */
  const initDragAreas = () => {
    if (
      !dragContainerRef.current ||
      !dragArea1Ref.current ||
      !dragArea2Ref.current ||
      !dragArea3Ref.current ||
      !dragArea4Ref.current ||
      !dragArea5Ref.current ||
      !headerRef.current ||
      !logoRef.current ||
      !buttonAddDeleteRef.current ||
      !topImagesRef.current ||
      !bottomLeftImagesRef.current ||
      !bottomRightImagesRef.current
    ) {
      return;
    }

    const BORDER_WIDTH = 3;

    const dragContainerRefRect =
      dragContainerRef.current.getBoundingClientRect();
    const headerRect = headerRef.current.getBoundingClientRect();
    const topImagesRefRect = topImagesRef.current.getBoundingClientRect();
    const buttonAddDeleteRefRect =
      buttonAddDeleteRef.current.getBoundingClientRect();
    const bottomLeftImagesRefRect =
      bottomLeftImagesRef.current.getBoundingClientRect();
    const bottomRightImagesRefRect =
      bottomRightImagesRef.current.getBoundingClientRect();

    const dragArea1Rect = {
      left: 0,
      top: 0,
      width: logoRef.current.offsetLeft,
      height: bottomLeftImagesRef.current.offsetTop,
    };

    dragArea1Ref.current.style.top = `${dragArea1Rect.top}px`;
    dragArea1Ref.current.style.left = `${dragArea1Rect.left}px`;
    dragArea1Ref.current.style.width = `${dragArea1Rect.width}px`;
    dragArea1Ref.current.style.height = `${dragArea1Rect.height}px`;
    dragArea1Ref.current.style.background = "blue";
    dragArea1Ref.current.style.opacity = "0.5";

    const dragArea2Rect = {
      left: 0,
      top: headerRect.height,
      width: buttonAddDeleteRef.current.offsetLeft,
      height: bottomLeftImagesRef.current.offsetTop - headerRect.height,
    };

    dragArea2Ref.current.style.top = `${dragArea2Rect.top}px`;
    dragArea2Ref.current.style.left = `${dragArea2Rect.left}px`;
    dragArea2Ref.current.style.width = `${dragArea2Rect.width}px`;
    dragArea2Ref.current.style.height = `${dragArea2Rect.height}px`;
    dragArea2Ref.current.style.opacity = "0.5";

    const dragArea3Rect = {
      left: 0,
      top: buttonAddDeleteRef.current.offsetTop + buttonAddDeleteRefRect.height,
      width: topImagesRef.current.offsetLeft,
      height:
        bottomLeftImagesRef.current.offsetTop -
        headerRect.height -
        buttonAddDeleteRefRect.height,
    };

    dragArea3Ref.current.style.top = `${dragArea3Rect.top}px`;
    dragArea3Ref.current.style.left = `${dragArea3Rect.left}px`;
    dragArea3Ref.current.style.width = `${dragArea3Rect.width}px`;
    dragArea3Ref.current.style.height = `${dragArea3Rect.height}px`;
    dragArea3Ref.current.style.opacity = "0.5";

    const dragArea4Rect = {
      left: 0,
      top: topImagesRef.current.offsetTop + topImagesRefRect.height,
      width: dragContainerRefRect.width - BORDER_WIDTH * 2,
      height:
        bottomRightImagesRef.current.offsetTop -
        headerRect.height -
        topImagesRefRect.height,
    };

    dragArea4Ref.current.style.top = `${dragArea4Rect.top}px`;
    dragArea4Ref.current.style.left = `${dragArea4Rect.left}px`;
    dragArea4Ref.current.style.width = `${dragArea4Rect.width}px`;
    dragArea4Ref.current.style.height = `${dragArea4Rect.height}px`;
    dragArea4Ref.current.style.opacity = "0.5";

    const dragArea5Rect = {
      left:
        bottomLeftImagesRefRect.width + bottomLeftImagesRef.current.offsetLeft,
      top:
        bottomLeftImagesRef.current.offsetTop - bottomLeftImagesRefRect.height,
      width:
        bottomRightImagesRef.current.offsetLeft -
        bottomLeftImagesRefRect.width -
        bottomLeftImagesRef.current.offsetLeft,
      height: bottomRightImagesRefRect.height * 2,
    };

    dragArea5Ref.current.style.top = `${dragArea5Rect.top}px`;
    dragArea5Ref.current.style.left = `${dragArea5Rect.left}px`;
    dragArea5Ref.current.style.width = `${dragArea5Rect.width}px`;
    dragArea5Ref.current.style.height = `${dragArea5Rect.height}px`;
    dragArea5Ref.current.style.opacity = "0.5";
  };

  /**
   * Detect parent container
   */
  const detectParentContainer = () => {
    if (
      !dragContainerRef.current ||
      !dragArea1Ref.current ||
      !dragArea2Ref.current ||
      !dragArea3Ref.current ||
      !dragArea4Ref.current ||
      !dragArea5Ref.current ||
      !headerRef.current ||
      !logoRef.current ||
      !buttonAddDeleteRef.current ||
      !topImagesRef.current ||
      !bottomLeftImagesRef.current ||
      !bottomRightImagesRef.current
    ) {
      return;
    }

    const stickerCoords = getCoords(
      currentDragElementRef.current as HTMLDivElement
    );

    const dragArea1Coords = getCoords(dragArea1Ref.current);
    const dragArea2Coords = getCoords(dragArea2Ref.current);
    const dragArea3Coords = getCoords(dragArea3Ref.current);
    const dragArea4Coords = getCoords(dragArea4Ref.current);
    const dragArea5Coords = getCoords(dragArea5Ref.current);

    // The drag area 1
    if (currentDragElementParentRef.current === dragArea1Ref.current) {
      if (
        stickerCoords.top > dragArea1Coords.top &&
        isPointInPath(
          dragArea2Ref.current,
          stickerCoords.left,
          stickerCoords.top
        )
      ) {
        currentDragElementParentRef.current = dragArea2Ref.current;
      }
    }

    // The drag area 2
    if (currentDragElementParentRef.current === dragArea2Ref.current) {
      if (
        stickerCoords.top < dragArea2Coords.top &&
        isPointInPath(
          dragArea1Ref.current,
          stickerCoords.right,
          stickerCoords.top
        )
      ) {
        currentDragElementParentRef.current = dragArea1Ref.current;
      }

      if (
        stickerCoords.top >= dragArea3Coords.top &&
        isPointInPath(
          dragArea3Ref.current,
          stickerCoords.right,
          stickerCoords.top
        )
      ) {
        currentDragElementParentRef.current = dragArea3Ref.current;
      }
    }

    // The drag area 3
    if (currentDragElementParentRef.current === dragArea3Ref.current) {
      if (
        stickerCoords.top < dragArea3Coords.top &&
        isPointInPath(
          dragArea2Ref.current,
          stickerCoords.right,
          stickerCoords.top
        )
      ) {
        currentDragElementParentRef.current = dragArea2Ref.current;
      }

      if (
        isPointInPath(
          dragArea4Ref.current,
          stickerCoords.right,
          stickerCoords.top
        )
      ) {
        currentDragElementParentRef.current = dragArea4Ref.current;
      }
    }

    // The drag area 4
    if (currentDragElementParentRef.current === dragArea4Ref.current) {
      if (
        stickerCoords.top < dragArea4Coords.top &&
        isPointInPath(
          dragArea3Ref.current,
          stickerCoords.right,
          stickerCoords.top
        )
      ) {
        currentDragElementParentRef.current = dragArea3Ref.current;
      }

      if (
        isPointInPath(
          dragArea5Ref.current,
          stickerCoords.left,
          stickerCoords.top
        ) &&
        isPointInPath(
          dragArea5Ref.current,
          stickerCoords.right,
          stickerCoords.top
        ) &&
        isPointInPath(
          dragArea5Ref.current,
          stickerCoords.left,
          stickerCoords.bottom
        ) &&
        isPointInPath(
          dragArea5Ref.current,
          stickerCoords.right,
          stickerCoords.bottom
        )
      ) {
        currentDragElementParentRef.current = dragArea5Ref.current;
      }
    }

    // The drag area 5
    if (currentDragElementParentRef.current === dragArea5Ref.current) {
      if (
        stickerCoords.top < dragArea5Coords.top &&
        (!isPointInPath(
          dragArea5Ref.current,
          stickerCoords.left,
          stickerCoords.top
        ) ||
          !isPointInPath(
            dragArea5Ref.current,
            stickerCoords.right,
            stickerCoords.top
          ))
      ) {
        currentDragElementParentRef.current = dragArea4Ref.current;
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
    onMountHandler: () => {
      initDragAreas();

      currentDragElementParentRef.current =
        dragArea2Ref.current as HTMLDivElement;
    },
    onMouseMoveHandler: () => {
      detectParentContainer();
      correctPositionRelativeToParent();
      correctPositionRelativeToDragContainer();
    },
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
  } = useSticker({
    board: BOARD_TYPE.right,
  });

  return (
    <>
      <Container
        className="sticker-container"
        ref={dragContainerRef}
        onMouseMove={onMouseMove as VoidFunction}
      >
        <div className="drag-area drag-area-1" ref={dragArea1Ref} />
        <div className="drag-area drag-area-2" ref={dragArea2Ref} />
        <div className="drag-area drag-area-3" ref={dragArea3Ref} />
        <div className="drag-area drag-area-4" ref={dragArea4Ref} />
        <div className="drag-area drag-area-5" ref={dragArea5Ref} />
        <Header ref={headerRef}>
          <Image
            src="/scrin-3-graf.png"
            width={47}
            height={47}
            alt="Picture of the author"
            draggable={false}
            ref={logoRef}
          />
          <span>vie de l’uet</span>
        </Header>
        <ButtonsRow>
          <ButtonsAddDelete
            add={setModalVisibility(true)}
            remove={() => {}}
            marginRight={10}
            ref={buttonAddDeleteRef}
          />
          <div ref={topImagesRef}>
            <Image
              src="/scrin3-a3-right1.jpg"
              width={262}
              height={185}
              alt="Picture of the author"
              draggable={false}
              priority
            />
            <Image
              src="/scrin3-a3-right2.jpg"
              width={262}
              height={185}
              alt="Picture of the author"
              draggable={false}
              priority
            />
          </div>
        </ButtonsRow>
        <div />
        <BannersRow>
          <div ref={bottomLeftImagesRef}>
            <Image
              src="/scrin3-a3-right3.jpg"
              width={262}
              height={185}
              alt="Picture of the author"
              draggable={false}
              priority
            />
            <Image
              src="/scrin3-a3-right4.jpg"
              width={262}
              height={185}
              alt="Picture of the author"
              draggable={false}
              priority
            />
          </div>
          <div ref={bottomRightImagesRef}>
            <Image
              src="/scrin3-a4-right1.jpg"
              width={129}
              height={188}
              alt="Picture of the author"
              draggable={false}
              priority
            />
            <Image
              src="/scrin3-a4-right2.jpg"
              width={129}
              height={188}
              alt="Picture of the author"
              draggable={false}
              priority
            />
          </div>
        </BannersRow>
        {stickers.map((item) => (
          <StickerComponent
            onMouseDown={onMouseDown as VoidFunction}
            key={item.id}
            sticker={item}
            editSticker={editSticker(item)}
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
