import { MutableRefObject, useEffect, useRef, useState } from "react";

type UseDraggableProps = {
  currentDragElementRef: MutableRefObject<HTMLDivElement | undefined>
  dragContainerRef: MutableRefObject<HTMLDivElement | undefined | null>
  detectParentContainer: () => void;
  correctPositionRelativeToParent: () => void;
  correctPositionRelativeToDragContainer: () => void;
  initDragAreas: () => void;
};

const useDraggable = (props: UseDraggableProps) => {
  let { 
        currentDragElementRef, 
        dragContainerRef, 
        detectParentContainer,
        correctPositionRelativeToParent,
        correctPositionRelativeToDragContainer,
        initDragAreas
      } = props;

  const clickOffsetRef = useRef({ x: 0, y: 0 });

  const [isDragStarted, setIsDragStarted] = useState(false);
  const isDragStartedRef = useRef(isDragStarted);

  /**
   * Mouse down handler.
   */
  const onMouseDown = (e: MouseEvent) => {
    if (!isDragStartedRef.current) {
      isDragStartedRef.current = true;
      setIsDragStarted(true);
    }

    currentDragElementRef.current = e.target as HTMLDivElement;
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

      console.log(offsetX, offsetY)


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

  return {
    onMouseDown,
    onMouseMove
  };
}

export default useDraggable