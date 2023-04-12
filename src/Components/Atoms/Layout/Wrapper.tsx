import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Wrapper: React.FC<Props> = ({ children }) => {
  return <WrapperDiv>{children}</WrapperDiv>;
};

export default Wrapper;

const WrapperDiv = styled.div`
  height: 200vh;
  overflow-x: hidden;
`;
