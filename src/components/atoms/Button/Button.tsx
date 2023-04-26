import React from "react";
import styled, { css } from "styled-components";
import { flex } from "../../../styles/Css";

export interface IButtonProps {
  children?: React.ReactNode;
  borderColor: "none" | "white" | "grey";
  whiteFont?: boolean;
  circle?: boolean;
}

const Button: React.FC<IButtonProps> = ({ children, borderColor, whiteFont, circle, ...rest }) => {
  const styles = { whiteFont, borderColor, circle };

  return (
    <ButtonContainer {...styles} {...rest}>
      {children}
    </ButtonContainer>
  );
};

export default Button;

const none = css`
  border: none;
`;
const white = css`
  border: 2px solid ${(props) => props.theme.white.lighter};
`;
const grey = css`
  border: 2px solid ${(props) => props.theme.black.vertLighter};
`;

const border = { none, white, grey };

const ButtonContainer = styled.button<IButtonProps>`
  ${flex("none")}
  ${(props) => props.borderColor && border[props.borderColor]}
  color: ${(props) => props.whiteFont && props.theme.white.lighter};

  border-radius: ${({ circle }) => (circle ? "100%" : "4px")};
  ${({ circle }) =>
    circle &&
    css`
      padding: 0.8rem;
    `};
  cursor: pointer;
`;
