import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { ChildrenProps } from "../../../interface/Interface";

const TagLabel = ({ children }: ChildrenProps) => {
  return <Label>{children}</Label>;
};

export default TagLabel;

const Label = styled.label`
  color: ${theme.grey.lighter};
  margin-right: 0.5rem;
`;
