import styled from "styled-components";
import SkeletonItem from "../../atoms/Loading/SkeletonItem";
import SkeletonTitle from "../../atoms/Loading/SkeletonTitle";
import { useInnerWidth } from "../../../utils/Hooks";

const Loadingspinner = () => {
  let skeletonItem = [];
  const { bothSideExceptSlideItemNum } = useInnerWidth();
  for (let i = 0; i < bothSideExceptSlideItemNum; i++) {
    skeletonItem.push(<SkeletonItem key={i} delayNum={i} bothSideExceptSlideItemNum={bothSideExceptSlideItemNum} />);
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
  height: 100vh;
`;

const FlexDiv = styled.div`
  display: flex;
  gap: 4px;
`;
