import { MouseEvent } from "react";
import styled, { css } from "styled-components";
import { AddIcon, DetailDownArrowIcon, PlayIcon } from "../../atoms/Icons";
import Button, { IButtonEventProps } from "../../atoms/Button/Button";
import { CheckIcon } from "../../atoms/Icons/ButtonIcon";
import { theme } from "../../../styles/theme";

interface ICircleButtonProps extends IButtonEventProps {
  buttonSize: "slideButton" | "detailButton";
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: () => void;
}

const iconSize = {
  slideButton: 1.1,
  detailButton: 1.4,
};

export const CirclePlay = ({ onMouseEnter, onMouseLeave, onClick, ...props }: ICircleButtonProps) => {
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

export const CircleAdd = ({ onMouseEnter, onMouseLeave, onClick, ...props }: ICircleButtonProps) => {
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

export const CircleCheck = ({ onMouseEnter, onMouseLeave, onClick, ...props }: ICircleButtonProps) => {
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

export const CircleDetail = ({ onMouseEnter, onMouseLeave, onClick, ...props }: ICircleButtonProps) => {
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
const buttonSizes = { slideButton, detailButton };

const CircleGreyButton = styled(Button)<ICircleButtonProps>`
  background-color: ${theme.black.lighter};
  ${({ buttonSize }) => buttonSize && buttonSizes[buttonSize]};
  &:hover {
    border: 2px solid ${theme.white.lighter};
  }
`;
