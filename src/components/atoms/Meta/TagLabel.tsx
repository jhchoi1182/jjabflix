import styled from "styled-components";
import { ChildrenProps } from "../../../interface/type";
import { theme } from "../../../styles/theme";

const TagLabel: React.FC<ChildrenProps> = ({ children }) => {
  return <Label>{children}</Label>;
};

export default TagLabel;

const Label = styled.label`
  color: ${theme.grey.lighter};
  margin-right: 0.5rem;
`;
