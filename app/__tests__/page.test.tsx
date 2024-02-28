import { render } from '@testing-library/react';

import { LeftSideProps } from '../components/LeftSide';
import { RightSideProps } from '../components/RightSide';
import { stickers, firstId, secondId } from '../data';
import Page from '../page';

jest.mock('../api/stickers/fetchStickers', () =>
  jest.fn(() => ({
    left: {
      [firstId]: stickers[firstId],
    },
    right: {
      [secondId]: stickers[secondId],
    },
  })),
);

jest.mock(
  '../components/LeftSide',
  () =>
    function LeftSide(props: LeftSideProps) {
      return <div>{JSON.stringify(props)}</div>;
    },
);
jest.mock(
  '../components/RightSide',
  () =>
    function RightSide(props: RightSideProps) {
      return <div>{JSON.stringify(props)}</div>;
    },
);

describe('Page', () => {
  it('matches the snapshot', async () => {
    const { container } = render(await Page());

    expect(container).toMatchSnapshot();
  });
});
