import styled, { css } from "styled-components";
import { small1, small2 } from "../../../styles/Fonts";

type CustomIconProps = {
  size: "small" | "basic";
};

export const Age15 = ({ size }: CustomIconProps) => {
  return <SmallRectangle size={size}>15+</SmallRectangle>;
};

export const HD = ({ size }: CustomIconProps) => {
  return <SmallRectangle size={size}>HD</SmallRectangle>;
};

const small = css`
  ${small1}
`;
const basic = css`
  ${small2}
`;

const fontSize = { small, basic };

const SmallRectangle = styled.button<CustomIconProps>`
  font-size: ${(props) => props.size && fontSize[props.size]};
  background-color: transparent;
  color: ${(props) => props.theme.white.lighter};
  border: 0.1px solid ${(props) => props.theme.grey.darker};
`;
