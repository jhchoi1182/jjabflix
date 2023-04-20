import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { sliderRefSelector } from "../../Lib/Atoms";

type PageIndicatorProps = {
  page: number;
  maxPage: number;
};

const PageIndicator: React.FC<PageIndicatorProps> = ({ maxPage, page }) => {
  const setSliderRef = useSetRecoilState(sliderRefSelector);

  let numBox = [];
  for (let i = 1; i < maxPage + 1; i++) {
    numBox.push(<li key={i} className={i === page ? "active" : ""} />);
  }

  const sliderRefHandler = (ref: HTMLElement | null) => {
    if (ref) setSliderRef({ sliderIndicatorRef: ref });
  };

  return (
    <IndicatorBox ref={sliderRefHandler} className="slider-hover">
      {numBox}
    </IndicatorBox>
  );
};

export default PageIndicator;

const IndicatorBox = styled.ul`
  position: absolute;
  margin-top: -10px;
  right: 12.5%;
  display: flex;
  gap: 1px;
  opacity: 0;
  li {
    width: 12px;
    height: 2px;
    background-color: #4d4d4d;
  }
  .active {
    background-color: #aaa;
  }
`;
