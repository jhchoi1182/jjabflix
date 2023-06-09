import styled from "styled-components";
import { ChildrenProps } from "../../../interface/Interface";

interface SlideContainerProps extends ChildrenProps {
  marginTop?: string;
}

const SlideContainer = ({ marginTop, children }: SlideContainerProps) => {
  return <ColumnContainer marginTop={marginTop}>{children}</ColumnContainer>;
};

export default SlideContainer;

const ColumnContainer = styled.section<SlideContainerProps>`
  display: flex;
  flex-direction: column;
  margin-top: ${({ marginTop }) => marginTop};
  .hiddenSlide {
    opacity: 0;
    margin-bottom: -15vw;
  }
  .showSlide {
    opacity: 1;
  }
  @media (max-width: 1099px) {
    margin-top: -10rem;
  }
`;
