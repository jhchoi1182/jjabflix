import styled from "styled-components";
import * as fonts from "../../../styles/Css";
import { ChildrenProps } from "../../../utils/type";

const SlideTitle: React.FC<ChildrenProps> = ({ children }) => {
  return <Title>{children}</Title>;
};

export default SlideTitle;

const Title = styled.label`
  position: absolute;
  margin-top: -2%;
  left: 12.5%;
  ${fonts.SlideTitle}
  color: ${(props) => props.theme.white.darker};
`;
