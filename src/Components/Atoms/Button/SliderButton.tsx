import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { css } from "styled-components";
import { sliderRefSelector } from "../../../Lib/Atoms";

interface ArrowProps {
  direction: "prev" | "next";
}

interface SliderButtonProps extends ArrowProps {
  prevSlide?: () => Promise<void>;
  nextSlide?: () => Promise<void>;
}

const Arrow: React.FC<ArrowProps> = ({ direction }) => {
  const setsetSliderRef = useSetRecoilState(sliderRefSelector);

  const arrowRefHandler = (ref: HTMLElement | null) => {
    if (ref) setsetSliderRef({ sliderArrowRef: ref });
  };

  return (
    <ArrowStyle ref={arrowRefHandler} className="slider-hover">
      {direction === "next" ? String.fromCharCode(10095) : String.fromCharCode(10094)}
    </ArrowStyle>
  );
};

const SliderButton: React.FC<SliderButtonProps> = ({ prevSlide, nextSlide, ...props }) => {
  const opacityRef = useRef<HTMLButtonElement>(null);

  const mouseOverHandler = () => {
    const { current } = opacityRef;
    if (current) current.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  };
  const mouseOutHandler = () => {
    const { current } = opacityRef;
    if (current) current.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  };

  return (
    <SliderBtn
      ref={opacityRef}
      onClick={prevSlide ?? nextSlide}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      direction={props.direction}
    >
      <Arrow {...props} />
    </SliderBtn>
  );
};

export default SliderButton;

const prev = css`
  left: 9%;
`;

const next = css`
  right: 9%;
`;

const direction = { prev, next };

const SliderBtn = styled.button<ArrowProps>`
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
  &:hover .slider-hover {
    opacity: 1;
  }
`;

const ArrowStyle = styled.div`
  width: 100%;
  font-size: 3rem;
  color: ${(props) => props.theme.white.lighter};
  opacity: 0;
  &:hover {
    font-size: 4rem;
  }
`;
