import { MouseEvent } from "react";
import styled, { css } from "styled-components";
import { AddIcon, DetailDownArrowIcon, PlayIcon } from "../../atoms/Icons";
import Button, { IButtonEventProps } from "../../atoms/Button/Button";
import { CheckIcon } from "../../atoms/Icons/ButtonIcon";

interface ICircleButtonProps extends IButtonEventProps {
  buttonSize: "slideButton" | "detailButton";
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: () => void;
}

const iconSize = {
  slideButton: 1.1,
  detailButton: 1.4,
};

export const CirclePlay: React.FC<ICircleButtonProps> = ({ onMouseEnter, onMouseLeave, onClick, ...props }) => {
  return (
    <CirclePlayButton
      circle
      borderColor="white"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      {...props}
    >
      <PlayIcon size={iconSize[props.buttonSize]} />
    </CirclePlayButton>
  );
};

const CirclePlayButton = styled(Button)<ICircleButtonProps>`
  background-color: ${(props) => props.theme.white.lighter};
  padding: 0.3rem;
  &:hover {
    opacity: 0.9;
  }
`;

export const CircleAdd: React.FC<ICircleButtonProps> = ({ onMouseEnter, onMouseLeave, onClick, ...props }) => {
  return (
    <CircleGreyButton
      circle
      whiteFont
      borderColor="grey"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      {...props}
    >
      <AddIcon size={iconSize[props.buttonSize]} />
    </CircleGreyButton>
  );
};

export const CircleCheck: React.FC<ICircleButtonProps> = ({ onMouseEnter, onMouseLeave, onClick, ...props }) => {
  return (
    <CircleGreyButton
      circle
      whiteFont
      borderColor="grey"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      {...props}
    >
      <CheckIcon size={iconSize[props.buttonSize]} />
    </CircleGreyButton>
  );
};

export const CircleDetail: React.FC<ICircleButtonProps> = ({ onMouseEnter, onMouseLeave, onClick, ...props }) => {
  return (
    <CircleGreyButton
      circle
      whiteFont
      borderColor="grey"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      {...props}
    >
      <DetailDownArrowIcon size={iconSize[props.buttonSize]} />
    </CircleGreyButton>
  );
};

const slideButton = css`
  padding: 0.3rem;
`;
const detailButton = css`
  padding: 0.5rem;
`;
const buttonSize = { slideButton, detailButton };

const CircleGreyButton = styled(Button)<ICircleButtonProps>`
  background-color: ${(props) => props.theme.black.lighter};
  ${(props) => props.buttonSize && buttonSize[props.buttonSize]};
  &:hover {
    border: 2px solid ${(props) => props.theme.white.lighter};
  }
`;
