import React from "react";
import styled from "styled-components";
import SkeletonItem from "../../atoms/Loading/SkeletonItem";
import SkeletonTitle from "../../atoms/Loading/SkeletonTitle";

const Loadingspinner = () => {
  let skeletonItem = [];
  const visibleCount = 6;
  for (let i = 0; i < visibleCount; i++) {
    skeletonItem.push(<SkeletonItem key={i} delayNum={i} visibleCount={visibleCount} />);
  }

  return (
    <Wrapper>
      <SkeletonTitle />
      <FlexDiv>{skeletonItem}</FlexDiv>
    </Wrapper>
  );
};

export default Loadingspinner;

const Wrapper = styled.div`
  padding: 123px 60px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-x: hidden;
`;

const FlexDiv = styled.div`
  display: flex;
  gap: 4px;
`;
