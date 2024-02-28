import { BOARD_TYPE } from '@/app/constants';

import onInteractHandler from '../onInteractHandler';

describe('onInteractHandler', () => {
  document.body.innerHTML = `<div><div class="sticker-container" data-board="left" /><div class="sticker-container" data-board="right" /></div>`;

  it('for the left board', () => {
    onInteractHandler(BOARD_TYPE.left);

    expect(document.body).toMatchSnapshot();
  });

  it('for the right board', () => {
    onInteractHandler(BOARD_TYPE.right);

    expect(document.body).toMatchSnapshot();
  });
});
