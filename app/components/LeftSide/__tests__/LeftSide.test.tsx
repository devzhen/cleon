import { render } from '@testing-library/react';

import { firstId, stickers } from '@/app/data';

import LeftSide from '..';

describe('LeftSide tests', () => {
  const props = {
    initialStickers: {
      [firstId]: stickers[firstId],
    },
  };
  it('matches the snapshot', () => {
    const { container } = render(<LeftSide {...props} />);

    expect(container).toMatchSnapshot();
  });
});
