import { forwardRef } from "react";

import { Button, Container } from "./styled";

type ButtonAddDeleteProps = {
  add: () => void;
  remove: () => void;
  marginTop?: number;
  marginRight?: number;
};

const ButtonAddDelete = forwardRef<HTMLDivElement, ButtonAddDeleteProps>(
  (props, ref) => {
    const { add, remove, marginRight, marginTop } = props;

    return (
      <Container $marginRight={marginRight} $marginTop={marginTop} ref={ref}>
        <Button onClick={add}>+</Button>
        <Button onClick={remove} $marginTop={10}>
          -
        </Button>
      </Container>
    );
  }
);

ButtonAddDelete.displayName = "ButtonAddDelete";

export default ButtonAddDelete;
