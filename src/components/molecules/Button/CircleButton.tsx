import styled from "styled-components";
import { AddIcon, ContentOpenIcon, PlayIcon } from "../../atoms/Icons";
import Button from "../../atoms/Button/Button";

export const CirclePlay = () => {
  return (
    <CirclePlayButton circle borderColor="white">
      <PlayIcon size={1.4} />
    </CirclePlayButton>
  );
};

const CirclePlayButton = styled(Button)`
  background-color: ${(props) => props.theme.white.lighter};
  &:hover {
    opacity: 0.9;
  }
`;

export const CircleAdd = () => {
  return (
    <CircleButton circle whiteFont borderColor="grey">
      <AddIcon size={1.4} />
    </CircleButton>
  );
};

export const CircleDetail = () => {
  return (
    <CircleButton circle whiteFont borderColor="grey">
      <ContentOpenIcon size={1.4} />
    </CircleButton>
  );
};

const CircleButton = styled(Button)`
  background-color: ${(props) => props.theme.black.lighter};
  &:hover {
    border: 2px solid ${(props) => props.theme.white.lighter};
  }
`;
