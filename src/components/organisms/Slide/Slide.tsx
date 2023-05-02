import React, { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import SlideItem from "./SlideItem";
import { IGetData } from "../../../interface/Interface";
import PageIndicator from "../../atoms/Slide/PageIndicator";
import SlideMoveBtn from "../../molecules/Slide/SlideMoveBtn";
import { useButtonOpacity } from "../../../utils/hooks";
import SlideTitle from "../../atoms/Slide/SlideTitle";
import DummyItem from "../../atoms/Slide/DummyItem";
import { useSetRecoilState } from "recoil";
import { categoryAtom } from "../../../lib/Atoms";

type VariantsProps = {
  direction: string;
};

const screenWidth = window.innerWidth;
const slideGap = () => {
  if (screenWidth === 1920) return 145;
  else return 0.0698 * screenWidth;
};

const rowVariants: Variants = {
  appearance: ({ direction }: VariantsProps) => ({
    x: direction === "next" ? screenWidth - slideGap() : -screenWidth + slideGap(),
  }),
  center: () => ({
    x: 0,
  }),
  exit: ({ direction }: VariantsProps) => ({
    x: direction === "next" ? -screenWidth + slideGap() : screenWidth - slideGap(),
  }),
};

const Slide: React.FC<IGetData> = ({ title, category, type, ...data }) => {
  const setHoveredCategory = useSetRecoilState(categoryAtom);
  const [direction, setDirection] = useState("next");
  const [isSliding, setIsSliding] = useState(false);
  const [page, setPage] = useState(0);
  const { setButtonOpacity } = useButtonOpacity();

  const showContentsNum = page === 0 ? 7 : 8;
  const totalContents = data.results.length;
  const maxPage = Math.ceil(totalContents / showContentsNum);

  const slidePrevent = () => setIsSliding((prev) => !prev);
  const prevSlide = async () => {
    if (data) {
      if (isSliding) return;
      await setDirection("prev");
      slidePrevent();
      setPage((prev) => (prev === 0 ? maxPage : prev - 1));
    }
  };
  const nextSlide = async () => {
    if (data) {
      if (isSliding) return;
      await setDirection("next");
      slidePrevent();
      setPage((prev) => (prev === maxPage ? 0 : prev + 1));
    }
  };

  const onMouseEnterHandler = () => {
    setHoveredCategory(category);
    setButtonOpacity(1);
  };

  const onMouseLeaveHandler = () => {
    setButtonOpacity(0);
  };

  return (
    <SlideContainer onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      <SlideTitle>{title}</SlideTitle>
      <PageIndicator maxPage={maxPage} page={page} category={category} />
      <AnimatePresence initial={false} onExitComplete={slidePrevent}>
        <RowContainer
          variants={rowVariants}
          custom={{ direction }}
          initial="appearance"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.75 }}
          key={category + page}
        >
          {page === 0 && <DummyItem />}
          {data?.results
            ?.slice(
              page === 0 ? 0 : (showContentsNum - 2) * page - 1,
              page === 0 ? showContentsNum : (showContentsNum - 2) * page + showContentsNum - 1
            )
            .map((content) => {
              return (
                <SlideItem key={content.id} {...content} media_type={content.media_type ?? type} category={category} />
              );
            })}
        </RowContainer>
      </AnimatePresence>
      {page !== 0 && <SlideMoveBtn category={category} direction="prev" prevSlide={prevSlide} />}
      {<SlideMoveBtn category={category} direction="next" nextSlide={nextSlide} />}
    </SlideContainer>
  );
};

export default Slide;

const SlideContainer = styled.div`
  position: relative;
  margin: -65px -12% 0px -12%;
`;

const RowContainer = styled(motion.div)`
  display: flex;
  gap: 8px;
  position: absolute;
  width: 100%;
`;
