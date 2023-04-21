import React, { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import Item from "../../Molecules/Slider/Item";
import { IGetData } from "../../../Lib/Atoms";
import PageIndicator from "../../Atoms/PageIndicator";
import SliderButton from "../../Atoms/Button/SliderButton";
import { useOpacity } from "../../../Utils/hooks";

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

const Slider: React.FC<IGetData> = ({ category, ...data }) => {
  const { mouseOver, mouseOut } = useOpacity({ over: 1, out: 0 });
  const [direction, setDirection] = useState("next");
  const [isSliding, setIsSliding] = useState(false);
  const [page, setPage] = useState(1);

  const showContentsNum = page === 1 ? 7 : 8;
  const totalContents = data.results.length;
  const maxPage = Math.ceil(totalContents / showContentsNum);

  const slidePrevent = () => setIsSliding((prev) => !prev);
  const prevSlide = async () => {
    if (data) {
      if (isSliding) return;
      await setDirection("prev");
      slidePrevent();
      setPage((prev) => (prev === 1 ? maxPage : prev - 1));
    }
  };
  const nextSlide = async () => {
    if (data) {
      if (isSliding) return;
      await setDirection("next");
      slidePrevent();
      setPage((prev) => (prev === maxPage ? 1 : prev + 1));
    }
  };
  return (
    <SliderBox onMouseOver={mouseOver} onMouseOut={mouseOut}>
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
          {page === 1 && <div style={{ width: "calc(100% / 8)" }} />}
          {data?.results
            ?.slice(
              page === 1 ? 0 : (showContentsNum - 2) * page - 1,
              page === 1 ? showContentsNum : (showContentsNum - 2) * page + showContentsNum - 1
            )
            .map((content) => {
              return <Item key={content.id} {...content} />;
            })}
        </RowContainer>
      </AnimatePresence>
      {page !== 1 && <SliderButton direction="prev" prevSlide={prevSlide} />}
      {<SliderButton direction="next" nextSlide={nextSlide} />}
    </SliderBox>
  );
};

export default Slider;

const SliderBox = styled.div`
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
