import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { detailAtom } from "../../../Atom/Atoms";

const DetaileBox = () => {
  const contentData = useRecoilValue(detailAtom);
  const contentsMatch = useMatch("/:dataId");
  console.log(contentData);

  return (
    <AnimatePresence>
      <motion.div
        layoutId={contentsMatch?.params.dataId}
        style={{
          position: "absolute",
          width: "40vw",
          height: "80vh",
          backgroundColor: "red",
          top: 50,
          left: 0,
          right: 0,
          margin: "0 auto",
        }}
      />
    </AnimatePresence>
  );
};

export default DetaileBox;
