import { Variants } from "framer-motion";

/** 아이템 전체 Variants */
export const contentVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.4,
    zIndex: 1,
    y: -70,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.15,
    },
  },
};

/** 초기에 보이지 말아야 할 정보 박스에 대한 Variants */
export const captionVariants: Variants = {
  hover: {
    opacity: 1,
    pointerEvents: "auto",
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.15,
    },
  },
};