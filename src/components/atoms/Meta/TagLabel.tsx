import React from "react";
import styled from "styled-components";
import { ChildrenProps } from "../../../interface/type";

const TagLabel: React.FC<ChildrenProps> = ({ children }) => {
  return <Label>{children}</Label>;
};

export default TagLabel;

const Label = styled.label`
  color: ${(props) => props.theme.grey.lighter};
  margin-right: 0.5rem;
`;
