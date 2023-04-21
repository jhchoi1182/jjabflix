import styled from "styled-components";
import { css } from "styled-components";
import { useOpacity } from "../../../Utils/hooks";

interface ArrowProps {
  direction: "prev" | "next";
}

interface SliderButtonProps extends ArrowProps {
  prevSlide?: () => Promise<void>;
  nextSlide?: () => Promise<void>;
}

const Arrow: React.FC<ArrowProps> = ({ direction }) => {
  return (
    <ArrowStyle className="slider-hover">
      {direction === "next" ? String.fromCharCode(10095) : String.fromCharCode(10094)}
    </ArrowStyle>
  );
};

const SliderButton: React.FC<SliderButtonProps> = ({ prevSlide, nextSlide, ...props }) => {
  const { mouseOver, mouseOut } = useOpacity({ over: 1, out: 0 });

  return (
    <SliderBtn
      onClick={prevSlide ?? nextSlide}
      direction={props.direction}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
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
`;

const ArrowStyle = styled.div`
  width: 100%;
  font-size: 3rem;
  color: ${(props) => props.theme.white.lighter};
  &:hover {
    font-size: 4rem;
  }
`;
