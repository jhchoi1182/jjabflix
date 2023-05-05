import styled from "styled-components";
import Button, { IButtonEventProps } from "../../atoms/Button/Button";
import { DetailIcon, PlayIcon } from "../../atoms/Icons";
import * as fonts from "../../../styles/Fonts";

export const Play: React.FC<IButtonEventProps> = ({ onClick }) => {
  return (
    <PlayButton borderColor="none">
      <PlayIcon size={1.75} />
      <span>재생</span>
    </PlayButton>
  );
};

const PlayButton = styled(Button)`
  gap: 1rem;
  ${fonts.mid1}
  padding: 0.65vw 1.7vw;
  background-color: ${(props) => props.theme.white.lighter};
  &:hover {
    opacity: 0.8;
  }
`;

export const Detail: React.FC<IButtonEventProps> = ({ onClick }) => {
  return (
    <DetailButton borderColor="none" whiteFont onClick={onClick}>
      <DetailIcon size={1.75} />
      <span>상세 정보</span>
    </DetailButton>
  );
};

const DetailButton = styled(Button)`
  gap: 1rem;
  ${fonts.mid1}
  padding: 0.65vw 1.7vw;
  background-color: rgba(109, 109, 110, 0.7);
  &:hover {
    background-color: rgba(109, 109, 110, 0.3);
  }
`;
