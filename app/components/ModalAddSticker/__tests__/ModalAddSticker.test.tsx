import { render } from '@testing-library/react';

import { BOARD_TYPE } from '@/app/constants';
import { firstId, stickers } from '@/app/data';

import ModalAddSticker from '..';

describe('ModalAddSticker tests', () => {
  const props = {
    board: BOARD_TYPE.left,
    closeModal: jest.fn(),
    createSticker: jest.fn(),
    sticker: stickers[firstId],
  };
  it('matches the snapshot', () => {
    const { container } = render(<ModalAddSticker {...props} />);

    expect(container).toMatchSnapshot();
  });
});
