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

const Slide: React.FC<IGetData> = ({ title, category, ...data }) => {
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
  return (
    <SlideContainer onMouseEnter={() => setButtonOpacity(1)} onMouseLeave={() => setButtonOpacity(0)}>
      <SlideTitle>{title}</SlideTitle>
      <PageIndicator maxPage={maxPage} page={page} />
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
              return <SlideItem key={content.id} {...content} />;
            })}
        </RowContainer>
      </AnimatePresence>
      {page !== 0 && <SlideMoveBtn direction="prev" prevSlide={prevSlide} />}
      {<SlideMoveBtn direction="next" nextSlide={nextSlide} />}
    </SlideContainer>
  );
};

export default Slide;

const SlideContainer = styled.div`
  position: relative;
  top: -100px;
  margin-left: -12%;
  margin-right: -12%;
`;

const RowContainer = styled(motion.div)`
  display: flex;
  gap: 8px;
  position: absolute;
  width: 100%;
`;
