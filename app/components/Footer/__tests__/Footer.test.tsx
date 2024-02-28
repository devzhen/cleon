import { render } from '@testing-library/react';

import Footer from '..';

describe('Footer tests', () => {
  it('matches the snapshot', () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});
