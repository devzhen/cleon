import { render } from '@testing-library/react';

import Header from '..';

describe('Header tests', () => {
  it('matches the snapshot', () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
