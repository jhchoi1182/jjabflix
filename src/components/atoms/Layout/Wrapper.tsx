import React from "react";
import styled from "styled-components";
import { ChildrenProps } from "../../../utils/type";

const Wrapper: React.FC<ChildrenProps> = ({ children }) => {
  return <WrapperDiv>{children}</WrapperDiv>;
};

export default Wrapper;

const WrapperDiv = styled.div`
  height: 200vh;
  overflow-x: hidden;
`;
