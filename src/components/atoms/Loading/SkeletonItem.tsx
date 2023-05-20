import { Variants, motion } from "framer-motion";
import styled from "styled-components";

interface SkeletonItemProps {
  delayNum: number;
  bothSideExceptSlideItemNum: number;
};

const LoadingVariants: Variants = {
  animate: (delayNum: number) => ({
    backgroundColor: ["rgb(0,0,0)", "rgb(51, 51, 51)", "rgb(0,0,0)"],
    transition: {
      delay: 0.1 + delayNum / 4,
      duration: 2,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatDelay: 1,
    },
  }),
};

const SkeletonItem = ({ delayNum, bothSideExceptSlideItemNum }: SkeletonItemProps) => {
  return (
    <Item variants={LoadingVariants} custom={delayNum} animate="animate" slideitemnum={bothSideExceptSlideItemNum} />
  );
};

export default SkeletonItem;

const Item = styled(motion.div)<{ slideitemnum: number }>`
  width: calc(100% / (${({ slideitemnum }) => slideitemnum}) - 4px);
  height: 160px;
  border-radius: 5px;
  background-color: rgb(0, 0, 0);
`;
