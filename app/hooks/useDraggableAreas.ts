import { MutableRefObject, useEffect, useRef } from "react";

type useDraggableAreasHookProps = {
  currentDragElementRef: MutableRefObject<HTMLDivElement | undefined>,
  onMount: () => void;
}

const useDraggableAreas = (props: useDraggableAreasHookProps) => {
  let { currentDragElementRef, onMount } = props;

  const clickOffsetRef = useRef({ x: 0, y: 0 });

  const isDragStartedRef = useRef(false);

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
      }
    };

    document.addEventListener("mouseup", onMouseUp);

    onMount();

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return {};
}

export default useDraggableAreas;