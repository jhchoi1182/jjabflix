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
  for (let i = 0; i < maxPage; i++) {
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
  @media (max-width: 1399px) {
    right: 14.4%;
  }
  @media (max-width: 1099px) {
    right: 16.8%;
  }
  @media (max-width: 799px) {
    right: 20.2%;
  }
  @media (max-width: 499px) {
    right: 25.4%;
  }
`;
