import React, { useRef } from "react";
import styled from "styled-components";
import { IContent } from "../../../../interface/Interface";
import TopDescriptionBox from "./TopDescriptionBox";
import BottomDescriptionBox from "./BottomDescriptionBox";

const DescriptionContainer: React.FC<IContent> = ({ ...contentData }) => {
  /** 더 보기 클릭 시 스크롤 맨 밑으로 */
  const scrollRef = useRef<HTMLDivElement>(null);

  const toBottomScrollHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PaddingContainer>
      <TopDescriptionBox toBottomScrollHandler={toBottomScrollHandler} {...contentData} />
      <BottomDescriptionBox ref={scrollRef} {...contentData}/>
    </PaddingContainer>
  );
};

export default DescriptionContainer;

const PaddingContainer = styled.section`
  padding: 3.5rem 5rem;
`;


