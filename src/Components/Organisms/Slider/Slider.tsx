import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Item from "../../Molecules/Slider/Item";
import { IGetData } from "../../../Lib/Atoms";

const rowVariants = {
  hidden: (isNext: boolean) => ({
    x: isNext ? window.innerWidth - 9.5 : -window.innerWidth + 9.5,
  }),
  visible: {
    x: 0,
  },
  exit: (isNext: boolean) => ({
    x: isNext ? -window.innerWidth + 9.5 : window.innerWidth - 9.5,
  }),
};

const Slider: React.FC<IGetData> = ({ category, ...data }) => {
  const [page, setPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const showContentsNum = 6;
  const totalContents = data.results.length;
  const maxPage = Math.floor(totalContents / showContentsNum) - 1;

  const slidePrevent = () => setIsSliding((prev) => !prev);
  const prevSlide = async () => {
    if (data) {
      if (isSliding) return;
      await setIsNext(false);
      slidePrevent();
      setPage((prev) => (prev === 0 ? maxPage : prev - 1));
    }
  };
  const nextSlide = async () => {
    if (data) {
      if (isSliding) return;
      await setIsNext(true);
      slidePrevent();
      setPage((prev) => (prev === maxPage ? 0 : prev + 1));
    }
  };

  return (
    <SliderBox>
      <PrevBtn onClick={prevSlide}> &#10094;</PrevBtn>
      <NextBtn onClick={nextSlide}>&#10095;</NextBtn>
      <AnimatePresence initial={false} onExitComplete={slidePrevent}>
        <RowContainer
          variants={rowVariants}
          custom={isNext}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.75 }}
          key={category + page}
          num={showContentsNum}
        >
          {data?.results?.slice(showContentsNum * page, showContentsNum * page + showContentsNum).map((data) => (
            <Item key={data.id} {...data} />
          ))}
        </RowContainer>
      </AnimatePresence>
    </SliderBox>
  );
};

export default Slider;

const PrevBtn = styled.button``;
const NextBtn = styled.button``;

const SliderBox = styled.div`
  position: relative;
  top: -100px;
`;

const RowContainer = styled(motion.div)<{ num: number }>`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(${(props) => props.num}, 1fr);
  position: absolute;
  width: 100%;
`;
