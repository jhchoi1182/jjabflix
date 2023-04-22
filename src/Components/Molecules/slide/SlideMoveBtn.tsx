import styled, { css } from "styled-components";
import Arrow, { ArrowProps } from "../../Atoms/Button/Arrow";
import { useOpacity } from "../../../Utils/hooks";

interface SlideButtonProps extends ArrowProps {
  prevSlide?: () => Promise<void>;
  nextSlide?: () => Promise<void>;
}

const SlideMoveBtn: React.FC<SlideButtonProps> = ({ prevSlide, nextSlide, ...props }) => {
  const { mouseOver, mouseOut } = useOpacity({ over: 1, out: 0 });

  return (
    <SlideBtn
      onClick={prevSlide ?? nextSlide}
      direction={props.direction}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <Arrow {...props} />
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
