import styled, { css } from "styled-components";
import { useButtonOpacity } from "../../../utils/Hooks/useButtonOpacity";
import { Arrow } from "../../atoms/Icons";
import { ArrowProps } from "../../atoms/Icons/NextPrevIcon";

interface SlideButtonProps extends ArrowProps {
  prevSlide?: () => void;
  nextSlide?: () => void;
  isSliding: boolean;
}

const SlidePaginationButton = ({ prevSlide, nextSlide, direction, category, isSliding }: SlideButtonProps) => {
  const { setButtonOpacity } = useButtonOpacity();

  return (
    <SlideBtn
      onClick={prevSlide ?? nextSlide}
      onMouseOver={() => setButtonOpacity(1)}
      onMouseOut={() => setButtonOpacity(0)}
      direction={direction}
      issliding={isSliding ? "true" : "false"}
    >
      <Arrow direction={direction} category={category} />
    </SlideBtn>
  );
};

export default SlidePaginationButton;

const prev = css`
  left: 9%;
  @media (max-width: 1399px) {
    left: 11%;
  }

  @media (max-width: 1099px) {
    left: 13%;
  }

  @media (max-width: 799px) {
    left: 16.5%;
  }

  @media (max-width: 499px) {
    left: 21.5%;
  }
`;

const next = css`
  right: 9%;
  @media (max-width: 1399px) {
    right: 11%;
  }

  @media (max-width: 1099px) {
    right: 13%;
  }

  @media (max-width: 799px) {
    right: 16.5%;
  }

  @media (max-width: 499px) {
    right: 21.5%;
  }
`;

const directions = { prev, next };

const SlideBtn = styled.button<{ direction: "prev" | "next"; issliding?: string }>`
  position: absolute;
  ${({ direction }) => direction && directions[direction]};
  border: none;
  width: calc(100% / 30);
  height: 8.8vw;
  background-color: ${({ issliding }) => (issliding ? "rgba(0, 0, 0, 0.5)" : "transparent")};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  @media (max-width: 1399px) {
    width: calc(100% / 32);
    height: 13rem;
  }
  @media (max-width: 1099px) {
    width: calc(100% / 29);
    height: 13.5vw;
  }
  @media (max-width: 799px) {
    width: calc(100% / 33);
    height: 18vw;
  }
  @media (max-width: 499px) {
    height: 26vw;
  }
`;
