import isPointInPath from '../isPointInPath';

jest.mock('../getCoords', () =>
  jest.fn(() => ({
    top: 0,
    left: 0,
    right: 100,
    bottom: 100,
    width: 100,
    height: 100,
  })),
);

describe('isPointInPath', () => {
  it('return true', () => {
    const elem = document.createElement('div');

    const res = isPointInPath(elem, 0, 0);

    expect(res).toBe(true);
  });

  it('return false', () => {
    const elem = document.createElement('div');

    const res = isPointInPath(elem, 200, 200);

    expect(res).toBe(false);
  });
});
