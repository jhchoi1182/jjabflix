import styled from "styled-components";

type PageIndicatorProps = {
  page: number;
  maxPage: number;
  isHovered: boolean;
};

const PageIndicator: React.FC<PageIndicatorProps> = ({ maxPage, page, isHovered }) => {
  let numBox = [];
  for (let i = 0; i < maxPage + 1; i++) {
    numBox.push(<li key={i} className={i === page ? "active" : ""} />);
  }

  return <IndicatorBox className={isHovered ? "slide-hover" : "pagination-item"}>{numBox}</IndicatorBox>;
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
