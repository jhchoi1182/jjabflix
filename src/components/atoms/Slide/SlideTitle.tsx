import styled from "styled-components";
import { ChildrenProps } from "../../../interface/type";
import { font } from "../../../styles/Fonts";

const SlideTitle: React.FC<ChildrenProps> = ({ children }) => {
  return <Title>{children}</Title>;
};

export default SlideTitle;

const Title = styled.label`
  position: absolute;
  margin-top: -2%;
  left: 12.5%;
  ${font.R_slide_title}
  color: ${(props) => props.theme.white.darker};
`;
