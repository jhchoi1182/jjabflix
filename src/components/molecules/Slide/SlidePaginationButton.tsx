import styled, { css } from "styled-components";
import { useButtonOpacity } from "../../../utils/Hooks/useButtonOpacity";
import { Arrow } from "../../atoms/Icons";
import { ArrowProps } from "../../atoms/Icons/NextPrevIcon";

interface SlideButtonProps extends ArrowProps {
  prevSlide?: () => Promise<void>;
  nextSlide?: () => Promise<void>;
  isSliding: boolean;
}

const SlidePaginationButton: React.FC<SlideButtonProps> = ({
  prevSlide,
  nextSlide,
  direction,
  category,
  isSliding,
}) => {
  const { setButtonOpacity } = useButtonOpacity();

  return (
    <SlideBtn
      onClick={prevSlide ?? nextSlide}
      onMouseOver={() => setButtonOpacity(1)}
      onMouseOut={() => setButtonOpacity(0)}
      direction={direction}
      issliding={isSliding}
    >
      <Arrow direction={direction} category={category} />
    </SlideBtn>
  );
};

export default SlidePaginationButton;

const prev = css`
  left: 9%;
`;

const next = css`
  right: 9%;
`;

const direction = { prev, next };

const SlideBtn = styled.button<{ direction: "prev" | "next"; issliding: boolean }>`
  position: absolute;
  width: calc(100% / 30);
  height: 170px;
  ${(props) => props.direction && direction[props.direction]};
  border: none;
  background-color: ${({ issliding }) => (issliding ? "rgba(0, 0, 0, 0.5)" : "transparent")};
  font-size: 3rem;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
