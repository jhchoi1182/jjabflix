import { forwardRef } from "react";
import styled from "styled-components";

type SliderNumProps = {
  page: number;
  maxPage: number;
  opacity: number;
};

const SliderNum = forwardRef<HTMLUListElement, SliderNumProps>(({ maxPage, page, opacity }, ref) => {
  let sliderNumBox = [];
  for (let i = 1; i < maxPage + 1; i++) {
    sliderNumBox.push(<li key={i} className={i === page ? "active" : ""} />);
  }
  return (
    <SliderNumBox ref={ref} className="hover-Btn" opacity={opacity}>
      {sliderNumBox}
    </SliderNumBox>
  );
});

export default SliderNum;

const SliderNumBox = styled.ul<{ opacity: number }>`
  position: absolute;
  margin-top: -10px;
  right: 12.5%;
  display: flex;
  gap: 1px;
  opacity: ${(props) => props.opacity};
  li {
    width: 12px;
    height: 2px;
    background-color: #4d4d4d;
  }
  .active {
    background-color: #aaa;
  }
`;
