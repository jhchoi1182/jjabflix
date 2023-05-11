import React from "react";
import styled from "styled-components";
import { ChildrenProps } from "../../../interface/type";

const Wrapper: React.FC<ChildrenProps> = ({ children }) => {
  return <WrapperDiv>{children}</WrapperDiv>;
};

export default Wrapper;

const WrapperDiv = styled.div`
  overflow-x: hidden;
`;
