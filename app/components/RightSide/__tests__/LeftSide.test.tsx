import { render } from '@testing-library/react';

import { firstId, stickers } from '@/app/data';

import RightSide from '..';

describe('RightSide tests', () => {
  const props = {
    initialStickers: {
      [firstId]: stickers[firstId],
    },
  };
  it('matches the snapshot', () => {
    const { container } = render(<RightSide {...props} />);

    expect(container).toMatchSnapshot();
  });
});
