import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryAtom } from "../../../lib/atoms";

type PageIndicatorProps = {
  page: number;
  maxPage: number;
  category: string;
};

const PageIndicator: React.FC<PageIndicatorProps> = ({ maxPage, page, category }) => {
  const hoveredCategory = useRecoilValue(categoryAtom);

  const className = category === hoveredCategory ? "slide-hover" : "pagination-item";
  let numBox = [];
  for (let i = 0; i < maxPage + 1; i++) {
    numBox.push(<li key={i} className={i === page ? "active" : ""} />);
  }

  return <IndicatorBox className={className}>{numBox}</IndicatorBox>;
};

export default PageIndicator;

const IndicatorBox = styled.ul`
  position: absolute;
  margin-top: -10px;
  right: 12.6%;
  display: flex;
  gap: 1px;
  li {
    width: 12px;
    height: 2px;
    background-color: #4d4d4d;
  }
  .active {
    background-color: #aaa;
  }
`;
