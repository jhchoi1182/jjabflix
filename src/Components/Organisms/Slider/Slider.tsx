import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import Item from "../../Molecules/Slider/Item";
import { IGetData } from "../../../Lib/Atoms";

type variantsProps = {
  isPrev: boolean;
  page: number;
};

const rowVariants: Variants = {
  hidden: ({ isPrev, page }: variantsProps) => ({
    x: isPrev
      ? page === 0
        ? -window.innerWidth + 110
        : -window.innerWidth - 150
      : page > 1
      ? window.innerWidth + 150
      : window.innerWidth + 110,
  }),
  visible: ({ isPrev, page }: variantsProps) => ({
    x: 0,
    transition: {
      duration: isPrev ? (page === 0 ? 0.65 : 0.75) : page === 2 ? 0.77 : 0.75,
    },
  }),
  exit: ({ isPrev, page }: variantsProps) => ({
    x: isPrev
      ? page === 0
        ? window.innerWidth - 110
        : window.innerWidth + 150
      : page > 1
      ? -window.innerWidth - 150
      : -window.innerWidth - 110,
  }),
};

const Slider: React.FC<IGetData> = ({ category, ...data }) => {
  const [page, setPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isPrev, setIsPrev] = useState(false);

  const showContentsNum = page === 0 ? 7 : 8;
  const totalContents = data.results.length;
  const maxPage = Math.ceil(totalContents / showContentsNum) - 1;

  const slidePrevent = () => setIsSliding((prev) => !prev);
  const prevSlide = async () => {
    if (data) {
      if (isSliding) return;
      await setIsPrev(true);
      slidePrevent();
      setPage((prev) => (prev === 0 ? maxPage : prev - 1));
    }
  };
  const nextSlide = async () => {
    if (data) {
      if (isSliding) return;
      await setIsPrev(false);
      slidePrevent();
      setPage((prev) => (prev === maxPage ? 0 : prev + 1));
    }
  };

  return (
    <SliderBox page={page}>
      <PrevBtn onClick={prevSlide}> &#10094;</PrevBtn>
      <NextBtn onClick={nextSlide}>&#10095;</NextBtn>
      <AnimatePresence initial={false} onExitComplete={slidePrevent}>
        <RowContainer
          variants={rowVariants}
          custom={{ isPrev, page }}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.75 }}
          key={category + page}
          num={showContentsNum}
        >
          {data?.results
            ?.slice(
              page > 1 ? (showContentsNum - 1) * page - 1 : (showContentsNum - 2) * page,
              page > 1
                ? (showContentsNum - 1) * page - 1 + showContentsNum
                : (showContentsNum - 2) * page + showContentsNum
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
const NextBtn = styled.button``;

const SliderBox = styled.div<{ page: number }>`
  position: relative;
  top: -100px;
  margin-left: ${(props) => (props.page === 0 ? "68px" : "-228px")};
  margin-right: -228px;
`;

const RowContainer = styled(motion.div)<{ num: number }>`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(${(props) => props.num}, 1fr);
  position: absolute;
  width: 100%;
`;
