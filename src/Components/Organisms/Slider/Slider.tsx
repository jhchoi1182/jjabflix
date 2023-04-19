import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled, { css } from "styled-components";
import Item from "../../Molecules/Slider/Item";
import { IGetData, IResult } from "../../../Lib/Atoms";

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
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [direction, setDirection] = useState("next");
  const [isSliding, setIsSliding] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [page, setPage] = useState(1);

  const showContentsNum = page === 1 ? 7 : 8;
  const totalContents = data.results.length;
  const maxPage = Math.ceil(totalContents / showContentsNum);

  let sliderContents: IResult[] = [];

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

  const mouseHoverHandler = () => {
    setButtonVisibility(true);
    setTimeout(() => {
      setButtonVisibility((prev) => !prev);
    }, 500);
  };

  const handleMouseOver = () => {
    setOpacity(1);
  };

  const handleMouseOut = () => {
    setOpacity(0);
  };

  const SliderNum = () => {
    let sliderNumBox = [];
    for (let i = 1; i < maxPage + 1; i++) {
      sliderNumBox.push(<li key={i} className={i === page ? "active" : ""} />);
    }
    return (
      <SliderNumBox className="hover-Btn" opacity={opacity}>
        {sliderNumBox}
      </SliderNumBox>
    );
  };

  return (
    <SliderBox buttonVisibility={buttonVisibility}>
      <SliderNum />
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
              sliderContents.push(content);
              return <Item key={content.id} onMouseEnter={mouseHoverHandler} {...content} />;
            })}
        </RowContainer>
      </AnimatePresence>
      {page !== 1 && (
        <PrevBtn onClick={prevSlide} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <PrevArrow className="hover-Btn">&#10094;</PrevArrow>
        </PrevBtn>
      )}
      {
        <NextBtn onClick={nextSlide} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <NextArrow className="hover-Btn">&#10095;</NextArrow>
        </NextBtn>
      }
    </SliderBox>
  );
};

export default Slider;

const SliderBox = styled.div<{ buttonVisibility: boolean }>`
  position: relative;
  top: -100px;
  margin-left: -12%;
  margin-right: -12%;
  &:hover .hover-Btn {
    opacity: ${(props) => props.buttonVisibility && "1"};
  }
`;

const RowContainer = styled(motion.div)`
  display: flex;
  gap: 8px;
  position: absolute;
  width: 100%;
`;

const SliderNumBox = styled.ul<{ opacity: number }>`
  position: absolute;
  margin-top: -10px;
  right: 12.5%;
  display: flex;
  gap: 1px;
  opacity: ${(props) => props.opacity};
  li {
    width: 12px;
    height: 2px;
    background-color: #4d4d4d;
  }
  .active {
    background-color: #aaa;
  }
`;

const SliderBtn = css`
  position: absolute;
  width: calc(100% / 30);
  height: 170px;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 3rem;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  &:hover .hover-Btn {
    opacity: 1;
  }
`;

const SliderBtnArrow = css`
  width: 100%;
  font-size: 3rem;
  color: ${(props) => props.theme.white.lighter};
  opacity: 0;
  &:hover {
    font-size: 4rem;
  }
`;

const PrevBtn = styled.button`
  ${SliderBtn}
  left: 9%;
`;

const NextBtn = styled.button`
  ${SliderBtn}
  right: 9%;
`;

const PrevArrow = styled.div`
  ${SliderBtnArrow}
`;

const NextArrow = styled.div`
  ${SliderBtnArrow}
`;
