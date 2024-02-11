import getCoords from './getCoords';

/**
 * Detect if a point in the element's path
 */
const isPointInPath = (elem: HTMLDivElement, x: number, y: number) => {
  const elemCoords = getCoords(elem);

  return (
    x >= elemCoords.left &&
    x <= elemCoords.right &&
    y >= elemCoords.top &&
    y <= elemCoords.bottom
  );
};

export default isPointInPath;
