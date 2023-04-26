import styled from "styled-components";
import Button from "../../atoms/Button/Button";
import { DetailIcon, PlayIcon } from "../../atoms/Icons";

export const Play = () => {
  return (
    <PlayButton borderColor="none">
      <PlayIcon size={1.75} />
      재생
    </PlayButton>
  );
};

const PlayButton = styled(Button)`
  gap: 1rem;
  font-size: 1.3vw;
  padding: 0.65vw 1.7vw;
  background-color: ${(props) => props.theme.white.lighter};
  &:hover {
    opacity: 0.8;
  }
`;

export const Detaile = () => {
  return (
    <DetaileButton borderColor="none" whiteFont>
      <DetailIcon size={1.75} />
      상세 정보
    </DetaileButton>
  );
};

const DetaileButton = styled(Button)`
  gap: 1rem;
  font-size: 1.3vw;
  padding: 0.65vw 1.7vw;
  background-color: rgba(109, 109, 110, 0.7);
  &:hover {
    background-color: rgba(109, 109, 110, 0.3);
  }
`;
