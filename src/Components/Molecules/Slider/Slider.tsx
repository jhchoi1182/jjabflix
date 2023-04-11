import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Item from "./Item";
import { IGetData } from "../../../Lib/Atoms";

const rowVariants = {
  hidden: {
    x: window.outerWidth - 12.5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth + 12.5,
  },
};

const Slider = (data: IGetData) => {
  const [page, setPage] = useState(0);
  const [isExit, setIsExit] = useState(false);

  const showContentsNum = 6;

  const toggleNextSlice = () => setIsExit((prev) => !prev);
  const incraseIndex = () => {
    if (data) {
      if (isExit) return;
      toggleNextSlice();
      const totalContents = data.results.length - 1;
      const maxIndex = Math.floor(totalContents / showContentsNum) - 1;
      setPage((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <SliderBox>
      <button onClick={incraseIndex}>넘기기</button>
      <AnimatePresence initial={false} onExitComplete={toggleNextSlice}>
        <RowContainer
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.75 }}
          key={page}
        >
          {data?.results.slice(showContentsNum * page, showContentsNum * page + showContentsNum).map((data) => (
            <Item key={data.id} {...data} />
          ))}
        </RowContainer>
      </AnimatePresence>
    </SliderBox>
  );
};

export default Slider;

const SliderBox = styled.div`
  position: relative;
  top: -100px;
  /* padding-left: 66px; */
`;

const RowContainer = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
