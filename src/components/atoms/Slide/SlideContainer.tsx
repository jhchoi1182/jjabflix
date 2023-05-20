import React from "react";
import styled from "styled-components";
import { ChildrenProps } from "../../../interface/type";

type SlideContainerProps = {
  marginTop?: string;
};

const SlideContainer: React.FC<ChildrenProps & SlideContainerProps> = ({ marginTop, children }) => {
  return <ColumnContainer marginTop={marginTop}>{children}</ColumnContainer>;
};

export default SlideContainer;

const ColumnContainer = styled.section<SlideContainerProps>`
  display: flex;
  flex-direction: column;
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: -40px;
  @media (max-width: 1099px) {
    margin-top: -10rem;
  }
`;
