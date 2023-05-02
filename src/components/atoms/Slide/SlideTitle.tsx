import styled from "styled-components";
import * as fonts from "../../../styles/Fonts";
import { ChildrenProps } from "../../../utils/type";

const SlideTitle: React.FC<ChildrenProps> = ({ children }) => {
  return <Title>{children}</Title>;
};

export default SlideTitle;

const Title = styled.label`
  position: absolute;
  margin-top: -2%;
  left: 12.5%;
  ${fonts.mid3}
  ${fonts.bold}
  color: ${(props) => props.theme.white.darker};
`;
