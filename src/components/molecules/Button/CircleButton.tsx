import styled, { css } from "styled-components";
import { AddIcon, ContentOpenIcon, PlayIcon } from "../../atoms/Icons";
import Button, { IButtonEventProps } from "../../atoms/Button/Button";
import { CheckIcon } from "../../atoms/Icons/ButtonIcon";

interface ICircleButtonProps extends IButtonEventProps {
  buttonSize?: "slide" | "detail";
}

export const CirclePlay: React.FC<ICircleButtonProps> = ({ onClick, ...props }) => {
  return (
    <CirclePlayButton circle borderColor="white" onClick={onClick} {...props}>
      <PlayIcon size={1.1} />
    </CirclePlayButton>
  );
};

const CirclePlayButton = styled(Button)`
  background-color: ${(props) => props.theme.white.lighter};
  padding: 0.3rem;
  &:hover {
    opacity: 0.9;
  }
`;

export const CircleAdd: React.FC<ICircleButtonProps> = ({ onClick, ...props }) => {
  return (
    <CircleGreyButton circle whiteFont borderColor="grey" onClick={onClick} {...props}>
      <AddIcon size={iconSize[props.buttonSize ?? "slide"]} />
    </CircleGreyButton>
  );
};

export const CircleCheck: React.FC<ICircleButtonProps> = ({ onClick, ...props }) => {
  return (
    <CircleGreyButton circle whiteFont borderColor="grey" onClick={onClick} {...props}>
      <CheckIcon size={iconSize[props.buttonSize ?? "slide"]} />
    </CircleGreyButton>
  );
};

export const CircleDetail: React.FC<ICircleButtonProps> = ({ onClick, ...props }) => {
  return (
    <CircleGreyButton circle whiteFont borderColor="grey" onClick={onClick} {...props}>
      <ContentOpenIcon size={1.1} />
    </CircleGreyButton>
  );
};

const slide = css`
  padding: 0.3rem;
`;
const detail = css`
  padding: 0.5rem;
`;

const buttonSize = { slide, detail };
const iconSize = {
  slide: 1.1,
  detail: 1.4,
};

const CircleGreyButton = styled(Button)<ICircleButtonProps>`
  background-color: ${(props) => props.theme.black.lighter};
  ${(props) => (props.buttonSize ? buttonSize[props.buttonSize] : buttonSize["slide"])};
  &:hover {
    border: 2px solid ${(props) => props.theme.white.lighter};
  }
`;
