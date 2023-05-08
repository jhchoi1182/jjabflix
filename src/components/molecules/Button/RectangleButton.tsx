import styled, { css } from "styled-components";
import Button, { IButtonEventProps } from "../../atoms/Button/Button";
import { DetailIcon, PlayIcon } from "../../atoms/Icons";
import * as fonts from "../../../styles/Fonts";

interface IRectangleButtonProps extends IButtonEventProps {
  buttonSize?: "main" | "detail";
}

export const Play: React.FC<IRectangleButtonProps> = ({ onClick, ...props }) => {
  return (
    <PlayButton borderColor="none" {...props}>
      <PlayIcon size={1.75} />
      <span>재생</span>
    </PlayButton>
  );
};

const main = css`
  padding: 0.65vw 1.7vw;
`;
const detail = css`
  padding: 0.2vw 1.7vw;
`;

const buttonSize = { main, detail };

const PlayButton = styled(Button)<IRectangleButtonProps>`
  gap: 1rem;
  ${fonts.mid1}
  ${(props) => (props.buttonSize ? buttonSize[props.buttonSize] : buttonSize["main"])};
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
