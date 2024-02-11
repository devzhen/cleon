import { forwardRef } from 'react';

import styles from './ButtonsAddDelete.module.css';

type ButtonAddDeleteProps = {
  add: () => void;
  remove: () => void;
  marginTop?: number;
  marginRight?: number;
};

const ButtonAddDelete = forwardRef<HTMLDivElement, ButtonAddDeleteProps>((props, ref) => {
  const { add, remove, marginTop, marginRight } = props;

  return (
    <div
      className={styles.container}
      ref={ref}
      style={{
        marginTop: marginTop || 0,
        marginRight: marginRight || 0,
      }}
    >
      <button onClick={add}>+</button>
      <button onClick={remove}>-</button>
    </div>
  );
});

ButtonAddDelete.displayName = 'ButtonAddDelete';

export default ButtonAddDelete;
