import styled, { css } from "styled-components";
import Button, { IButtonEventProps } from "../../atoms/Button/Button";
import { DetailIcon, PlayIcon } from "../../atoms/Icons";
import { fontSize } from "../../../styles/Fonts";
import { theme } from "../../../styles/theme";

interface IRectangleButtonProps extends IButtonEventProps {
  buttonSize: "mainButton" | "detailButton";
  onMouseLeave?: () => void;
}

const IconSize = {
  mainButton: 1.75,
  detailButton: 1.75,
};

export const Play = ({ onMouseLeave, onClick, ...props }:IRectangleButtonProps) => {
  return (
    <PlayButton borderColor="none" {...props} onMouseLeave={onMouseLeave} onClick={onClick}>
      <PlayIcon size={IconSize[props.buttonSize]} />
      <span>재생</span>
    </PlayButton>
  );
};

const mainButton = css`
  padding: 0.65vw 1.7vw;
`;
const detailButton = css`
  padding: 0.2vw 1.7vw;
`;

const buttonSizes = { mainButton, detailButton };

const PlayButton = styled(Button)<IRectangleButtonProps>`
  gap: 1rem;
  font-size: ${fontSize.Mid1};
  ${({ buttonSize }) => buttonSize && buttonSizes[buttonSize]};
  background-color: ${theme.white.lighter};
  &:hover {
    opacity: 0.8;
  }
`;

export const Detail = ({ onClick, ...props } : IRectangleButtonProps) => {
  return (
    <DetailButton borderColor="none" whiteFont onClick={onClick}>
      <DetailIcon size={IconSize[props.buttonSize]} />
      <span>상세 정보</span>
    </DetailButton>
  );
};

const DetailButton = styled(Button)`
  gap: 1rem;
  font-size: ${fontSize.Mid1};
  padding: 0.65vw 1.7vw;
  background-color: rgba(109, 109, 110, 0.7);
  &:hover {
    background-color: rgba(109, 109, 110, 0.3);
  }
`;
