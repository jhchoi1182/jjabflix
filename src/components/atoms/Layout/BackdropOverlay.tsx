import React from "react";
import { ChildrenProps } from "../../../interface/type";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackdropOverlay: React.FC<ChildrenProps> = ({ children }) => {
  const navigate = useNavigate();

  return <WrapperContainer onClick={() => navigate(-1)}>{children}</WrapperContainer>;
};

export default BackdropOverlay;

const WrapperContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;
