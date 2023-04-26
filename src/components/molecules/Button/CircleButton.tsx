import styled from "styled-components";
import { AddIcon, ContentOpenIcon, PlayIcon } from "../../atoms/Icons";
import Button from "../../atoms/Button/Button";

export const CirclePlay = () => {
  return (
    <CirclePlayButton circle borderColor="white">
      <PlayIcon size={1.1} />
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
    <CircleGreyButton circle whiteFont borderColor="grey">
      <AddIcon size={1.1} />
    </CircleGreyButton>
  );
};

export const CircleDetail = () => {
  return (
    <CircleGreyButton circle whiteFont borderColor="grey">
      <ContentOpenIcon size={1.1} />
    </CircleGreyButton>
  );
};

const CircleGreyButton = styled(Button)`
  background-color: ${(props) => props.theme.black.lighter};
  &:hover {
    border: 2px solid ${(props) => props.theme.white.lighter};
  }
`;
