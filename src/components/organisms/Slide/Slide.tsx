import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import SlideItem from "./SlideItem";
import { IGetData } from "../../../interface/Interface";
import PageIndicator from "../../atoms/Slide/PageIndicator";
import SlideMoveBtn from "../../molecules/Slide/SlidePaginationButton";
import { useButtonOpacity } from "../../../utils/hooks";
import SlideTitle from "../../atoms/Slide/SlideTitle";
import DummyItem from "../../atoms/Slide/DummyItem";
import { useSetRecoilState } from "recoil";
import { categoryAtom } from "../../../lib/Atoms";
import { useOutletContext } from "react-router-dom";

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
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const setHoveredCategory = useSetRecoilState(categoryAtom);
  const [direction, setDirection] = useState("next");
  const [isSliding, setIsSliding] = useState(false);
  const [overflowY, setOverflowY] = useState("inherit");
  const [page, setPage] = useState(0);
  const zIndexRef = useRef<HTMLDivElement>(null);
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
    if (zIndexRef.current) {
      zIndexRef.current.style.zIndex = "1";
    }
  };

  const onMouseLeaveHandler = () => {
    setButtonOpacity(0);
    if (zIndexRef.current) {
      zIndexRef.current.style.zIndex = "0";
    }
  };

  useEffect(() => {
    if (pathnameId) setOverflowY("hidden");
    if (pathnameId === undefined) {
      setTimeout(() => {
        setOverflowY("inherit");
      }, 500);
    }
  }, [pathnameId]);

  return (
    <SlideContainer ref={zIndexRef} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
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
          overflowy={overflowY}
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
      {/* <Test /> */}
      {page !== 0 && <SlideMoveBtn category={category} direction="prev" prevSlide={prevSlide} />}
      {<SlideMoveBtn category={category} direction="next" nextSlide={nextSlide} />}
    </SlideContainer>
  );
};

export default Slide;

const SlideContainer = styled.div`
  position: relative;
  margin: -65px -12% 0px -12%;
  margin-bottom: 34rem;
`;

const RowContainer = styled(motion.div)<{ overflowy: string }>`
  display: flex;
  position: absolute;
  gap: 8px;
  width: 100%;
  height: 170px;
  overflow-y: ${(props) => props.overflowy};
`;