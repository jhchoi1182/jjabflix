import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { font } from "../../../styles/Fonts";
import { ChildrenProps } from "../../../interface/Interface";

const SlideTitle = ({ children }: ChildrenProps) => {  
  return <Title>{children}</Title>;
};

export default React.memo(SlideTitle);

const Title = styled.label`
  position: absolute;
  margin-top: -2%;
  left: 12.5%;
  ${font.R_slide_title}
  color: ${theme.white.darker};
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
