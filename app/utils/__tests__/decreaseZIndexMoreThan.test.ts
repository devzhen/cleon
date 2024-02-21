import { BOARD_TYPE } from '@/app/constants';

import decreaseZIndexMoreThan from '../decreaseZIndexMoreThan';

describe('decreaseZIndexMoreThan', () => {
  it('without stickers', () => {
    decreaseZIndexMoreThan(BOARD_TYPE.left, 1);

    expect(document.body).toMatchSnapshot();
  });

  it('with stickers', () => {
    const sticker1 = document.createElement('div');
    sticker1.setAttribute('data-board', BOARD_TYPE.left);
    sticker1.style.zIndex = '2';
    sticker1.classList.add('sticker');
    document.body.appendChild(sticker1);

    const sticker2 = document.createElement('div');
    sticker2.setAttribute('data-board', BOARD_TYPE.left);
    sticker2.style.zIndex = '3';
    sticker2.classList.add('sticker');
    document.body.appendChild(sticker2);

    decreaseZIndexMoreThan(BOARD_TYPE.left, 2);

    expect(document.body).toMatchSnapshot();
  });
});
