import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

interface ICloseButton {
  top: string;
  right: string;
  size: "detailButton";
}

const CloseButton: React.FC<ICloseButton> = ({ top, right, size }) => {
  const navigate = useNavigate();

  return (
    <Close top={top} right={right} size={size} onClick={() => navigate(-1)}>
      X
    </Close>
  );
};

export default CloseButton;

const detailButton = css`
  width: 3.5rem;
  height: 3.5rem;
  font-size: 2rem;
`;

const size = { detailButton };

const Close = styled.button<ICloseButton>`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  ${(props) => props.size && size[props.size]}
  border-radius: 100%;
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.lighter};
  border: none;
  cursor: pointer;
`;
