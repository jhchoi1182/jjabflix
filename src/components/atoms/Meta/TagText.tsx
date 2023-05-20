import styled from "styled-components";
import { ChildrenProps } from "../../../interface/type";
import { theme } from "../../../styles/theme";

const TagText: React.FC<ChildrenProps> = ({ children }) => {
  return <Text>{children}</Text>;
};

export default TagText;

const Text = styled.span`
  color: ${theme.white.lighter};
  margin-right: 0.5rem;
`;
