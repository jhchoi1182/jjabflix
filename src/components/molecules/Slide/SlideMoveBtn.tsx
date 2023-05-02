import styled, { css } from "styled-components";
import { useButtonOpacity } from "../../../utils/hooks";
import { Arrow } from "../../atoms/Icons/";
import { ArrowProps } from "../../atoms/Icons/NextPrevIcon";

interface SlideButtonProps extends ArrowProps {
  prevSlide?: () => Promise<void>;
  nextSlide?: () => Promise<void>;
}

const SlideMoveBtn: React.FC<SlideButtonProps> = ({ prevSlide, nextSlide, direction, isHovered }) => {
  const { setButtonOpacity } = useButtonOpacity();

  return (
    <SlideBtn
      onClick={prevSlide ?? nextSlide}
      onMouseOver={() => setButtonOpacity(1)}
      onMouseOut={() => setButtonOpacity(0)}
      direction={direction}
    >
      <Arrow direction={direction} isHovered={isHovered} />
    </SlideBtn>
  );
};

export default SlideMoveBtn;

const prev = css`
  left: 9%;
`;

const next = css`
  right: 9%;
`;

const direction = { prev, next };

const SlideBtn = styled.button<ArrowProps>`
  position: absolute;
  width: calc(100% / 30);
  height: 170px;
  ${(props) => props.direction && direction[props.direction]};
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 3rem;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
