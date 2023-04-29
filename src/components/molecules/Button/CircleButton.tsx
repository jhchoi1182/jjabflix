import styled from "styled-components";
import { AddIcon, ContentOpenIcon, PlayIcon } from "../../atoms/Icons";
import Button, { IButtonEventProps } from "../../atoms/Button/Button";
import { CheckIcon } from "../../atoms/Icons/ButtonIcon";

export const CirclePlay: React.FC<IButtonEventProps> = ({ onClick }) => {
  return (
    <CirclePlayButton circle borderColor="white" onClick={onClick}>
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

export const CircleAdd: React.FC<IButtonEventProps> = ({ onClick }) => {
  return (
    <CircleGreyButton circle whiteFont borderColor="grey" onClick={onClick}>
      <AddIcon size={1.1} />
    </CircleGreyButton>
  );
};

export const CircleCheck: React.FC<IButtonEventProps> = ({ onClick }) => {
  return (
    <CircleGreyButton circle whiteFont borderColor="grey" onClick={onClick}>
      <CheckIcon size={1.1} />
    </CircleGreyButton>
  );
};

export const CircleDetail: React.FC<IButtonEventProps> = ({ onClick }) => {
  return (
    <CircleGreyButton circle whiteFont borderColor="grey" onClick={onClick}>
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
