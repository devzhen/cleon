import { render } from '@testing-library/react';

import ButtonsAddDelete from '../';

describe('ButtonsAddDelete tests', () => {
  const props = {
    add: jest.fn(),
    remove: jest.fn(),
  };

  it('matches the snapshot', () => {
    const { container } = render(<ButtonsAddDelete {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot with margins', () => {
    const newProps = {
      ...props,
      marginTop: 100,
      marginRight: 100,
    };

    const { container } = render(<ButtonsAddDelete {...newProps} />);

    expect(container).toMatchSnapshot();
  });
});
