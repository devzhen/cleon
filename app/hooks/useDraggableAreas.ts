import { MutableRefObject, useEffect, useRef } from 'react';

type useDraggableAreasHookProps = {
  currentDragElementRef: MutableRefObject<HTMLDivElement | undefined>;
  dragContainerRef: MutableRefObject<HTMLDivElement | null>;
  onMountHandler: () => void;
  onMouseMoveHandler: () => void;
  onMouseDownHandler: ({ zIndex, stickerId }: { zIndex: number; stickerId: string }) => void;
};

const useDraggableAreas = (props: useDraggableAreasHookProps) => {
  const {
    currentDragElementRef,
    onMountHandler,
    onMouseMoveHandler,
    dragContainerRef,
    onMouseDownHandler,
  } = props;

  const clickOffsetRef = useRef({ x: 0, y: 0 });

  const isDragStartedRef = useRef(false);

  /**
   * Mouse down handler.
   */
  const onMouseDown = (e: MouseEvent) => {
    if (!isDragStartedRef.current) {
      isDragStartedRef.current = true;
    }

    currentDragElementRef.current = (e.target as HTMLElement)?.closest(
      '.sticker',
    ) as HTMLDivElement;
    currentDragElementRef.current.style.cursor = 'move';

    const offsetX = e.pageX - currentDragElementRef.current.getBoundingClientRect().left;

    const offsetY = e.pageY - currentDragElementRef.current.getBoundingClientRect().top;

    clickOffsetRef.current.x = offsetX;
    clickOffsetRef.current.y = offsetY;

    const zIndex = parseInt(window.getComputedStyle(currentDragElementRef.current, null).zIndex);
    const stickerId = currentDragElementRef.current.getAttribute('data-id') as string;

    onMouseDownHandler({ zIndex, stickerId });
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

      onMouseMoveHandler();
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
        currentDragElementRef.current.style.cursor = 'pointer';
      }

      if (isDragStartedRef.current) {
        isDragStartedRef.current = false;
      }
    };

    document.addEventListener('mouseup', onMouseUp);

    onMountHandler();

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    onMouseDown,
    onMouseMove,
  };
};

export default useDraggableAreas;
