import { useEffect, useRef } from "react";
import Image from "next/image";

import { Container, Header, ButtonsRow, BannersRow } from "./styled";
import ButtonsAddDelete from "../ButtonsAddDelete";
import useDraggableAreas from "@/app/hooks/useDraggableAreas";

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

  /**
   * Init draggable areas
   */
  const initDragAreas = () => {
    if (
      !dragContainerRef.current ||
      !dragArea1Ref.current ||
      !dragArea2Ref.current ||
      !dragArea3Ref.current
    ) {
      return;
    }
  };

  useDraggableAreas({
    currentDragElementRef,
    onMount: initDragAreas,
  });

  return (
    <>
      <Container className="sticker-container" ref={dragContainerRef}>
        <div className="drag-area" ref={dragArea1Ref} />
        <div className="drag-area" ref={dragArea2Ref} />
        <div className="drag-area" ref={dragArea3Ref} />
        <Header>
          <Image
            src="/scrin-3-graf.png"
            width={47}
            height={47}
            alt="Picture of the author"
            draggable={false}
          />
          <span>vie de l’uet</span>
        </Header>
        <ButtonsRow>
          <ButtonsAddDelete
            add={() => {}}
            remove={() => {}}
            marginTop={2}
            marginRight={10}
          />
          <Image
            src="/scrin3-a3-right1.jpg"
            width={262}
            height={185}
            alt="Picture of the author"
            draggable={false}
          />
          <Image
            src="/scrin3-a3-right2.jpg"
            width={262}
            height={185}
            alt="Picture of the author"
            draggable={false}
          />
        </ButtonsRow>
        <div />
        <BannersRow>
          <div>
            <Image
              src="/scrin3-a3-right3.jpg"
              width={262}
              height={185}
              alt="Picture of the author"
              draggable={false}
            />
            <Image
              src="/scrin3-a3-right4.jpg"
              width={262}
              height={185}
              alt="Picture of the author"
              draggable={false}
            />
          </div>
          <div>
            <Image
              src="/scrin3-a4-right1.jpg"
              width={129}
              height={188}
              alt="Picture of the author"
              draggable={false}
            />
            <Image
              src="/scrin3-a4-right2.jpg"
              width={129}
              height={188}
              alt="Picture of the author"
              draggable={false}
            />
          </div>
        </BannersRow>
      </Container>
    </>
  );
}
