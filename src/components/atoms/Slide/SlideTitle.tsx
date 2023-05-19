import styled, { css } from "styled-components";
import { ChildrenProps } from "../../../interface/type";
import { font } from "../../../styles/Fonts";

const SlideTitle: React.FC<ChildrenProps> = ({ children }) => {
  return <Title>{children}</Title>;
};

export default SlideTitle;

const TitleBaseCss = css`
  position: absolute;
  margin-top: -2%;
  ${font.R_slide_title}
  color: ${(props) => props.theme.white.darker};
`;

const Title = styled.label`
  ${TitleBaseCss}
  left: 12.5%;
  @media (max-width: 1399px) {
    left: 14.5%;
  }

  @media (max-width: 1099px) {
    left: 17%;
  }

  @media (max-width: 799px) {
    left: 20%;
  }

  @media (max-width: 499px) {
    left: 25%;
  }
`;
