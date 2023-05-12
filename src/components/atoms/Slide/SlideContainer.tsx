import React from "react";
import styled from "styled-components";
import { ChildrenProps } from "../../../interface/type";

const SlideContainer: React.FC<ChildrenProps> = ({ children }) => {
  return <ColumnContainer>{children}</ColumnContainer>;
};

export default SlideContainer;

const ColumnContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: -40px;
`;
