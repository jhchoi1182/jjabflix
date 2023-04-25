import React from "react";
import styled from "styled-components";

interface IBtnProps {
  children?: React.ReactNode;
  icon: React.ReactNode;
  onlyIcon?: boolean;
}

const Button: React.FC<IBtnProps> = ({ children, icon, ...rest }) => {
  return <ButtonContainer {...rest}>안녕</ButtonContainer>;
};

export default Button;

const ButtonContainer = styled.button``;
