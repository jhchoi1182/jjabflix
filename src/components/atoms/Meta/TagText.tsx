import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { ChildrenProps } from "../../../interface/Interface";

const TagText = ({ children } : ChildrenProps) => {
  return <Text>{children}</Text>;
};

export default TagText;

const Text = styled.span`
  color: ${theme.white.lighter};
  margin-right: 0.5rem;
`;
