import React from "react";
import styled from "styled-components";
import { ChildrenProps } from "../../interface/type";

const TagText: React.FC<ChildrenProps> = ({ children }) => {
  return <Text>{children}</Text>;
};

export default TagText;

const Text = styled.span`
  color: ${(props) => props.theme.white.lighter};
  margin-right: 0.5rem;
`;
