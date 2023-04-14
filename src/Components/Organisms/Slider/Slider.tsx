import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import Item from "../../Molecules/Slider/Item";
import { IGetData } from "../../../Lib/Atoms";

type VariantsProps = {
  direction: string;
};

const rowVariants: Variants = {
  appearance: ({ direction }: VariantsProps) => ({
    x: direction === "next" ? window.innerWidth - 145 : -window.innerWidth + 145,
  }),
  center: () => ({
    x: 0,
  }),
  exit: ({ direction }: VariantsProps) => ({
    x: direction === "next" ? -window.innerWidth + 145 : window.innerWidth - 145,
  }),
};

const Slider: React.FC<IGetData> = ({ category, ...data }) => {
  const [page, setPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [direction, setDirection] = useState("next");

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
    <SliderBox page={page}>
      {page !== 0 && <PrevBtn onClick={prevSlide}> &#10094;</PrevBtn>}
      {page !== maxPage && <NextBtn onClick={nextSlide}>&#10095;</NextBtn>}
      <AnimatePresence initial={false} onExitComplete={slidePrevent}>
        <RowContainer
          variants={rowVariants}
          custom={{ direction }}
          initial="appearance"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.75 }}
          key={category + page}
          num={showContentsNum}
        >
          {page === 0 && <div style={{ width: "calc(100% / 8)" }} />}
          {data?.results
            ?.slice(
              page === 0 ? 0 : (showContentsNum - 2) * page - 1,
              page === 0 ? showContentsNum : (showContentsNum - 2) * page + showContentsNum - 1
            )
            .map((data) => (
              <Item key={data.id} {...data} />
            ))}
        </RowContainer>
      </AnimatePresence>
    </SliderBox>
  );
};

export default Slider;

const PrevBtn = styled.button`
  margin-left: 300px;
`;
const NextBtn = styled.button`
`;

const SliderBox = styled.div<{ page: number }>`
  position: relative;
  top: -100px;
  margin-left: -228px;
  margin-right: -228px;
`;

const RowContainer = styled(motion.div)<{ num: number }>`
  display: flex;
  gap: 8px;
  position: absolute;
  width: 100%;
`;
