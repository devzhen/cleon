import { Button, Container } from "./styled";

type ButtonAddDeleteProps = {
  add: () => void;
  remove: () => void;
  marginTop?: number;
  marginRight?: number;
};

const ButtonAddDelete = (props: ButtonAddDeleteProps) => {
  const { add, remove, marginRight, marginTop } = props;

  return (
    <Container $marginRight={marginRight} $marginTop={marginTop}>
      <Button onClick={add}>+</Button>
      <Button onClick={remove} $marginTop={10}>
        -
      </Button>
    </Container>
  );
};

export default ButtonAddDelete;
