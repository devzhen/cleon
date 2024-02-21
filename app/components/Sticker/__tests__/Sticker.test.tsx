import { render } from '@testing-library/react';

import { BOARD_TYPE } from '@/app/constants';
import { firstId, stickers } from '@/app/data';

import Sticker from '..';

describe('Sticker tests', () => {
  const props = {
    board: BOARD_TYPE.left,
    closeModal: jest.fn(),
    createSticker: jest.fn(),
    sticker: stickers[firstId],
    editSticker: jest.fn(),
    isDeleteMode: false,
    onMouseDown: jest.fn(),
    removeSticker: jest.fn(),
  };
  it('matches the snapshot', () => {
    const { container } = render(<Sticker {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot when isDeleteMode is true', () => {
    const newProps = {
      ...props,
      isDeleteMode: true,
    };

    const { container } = render(<Sticker {...newProps} />);

    expect(container).toMatchSnapshot();
  });
});
