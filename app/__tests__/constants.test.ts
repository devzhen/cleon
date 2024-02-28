import * as constants from '../constants';

describe('constants', () => {
  it('matches snapshot', () => {
    expect(constants).toMatchSnapshot();
  });
});
