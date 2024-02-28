import getCoords from '../getCoords';

describe('getCoords', () => {
  it('return coords', () => {
    const elem = document.createElement('div');
    elem.getBoundingClientRect = jest.fn(
      () =>
        ({
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          top: 10,
          left: 10,
        }) as DOMRect,
    );

    const coords = getCoords(elem);

    expect(coords).toMatchSnapshot();
  });
});
