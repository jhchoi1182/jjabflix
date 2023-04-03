import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";

const DetaileBox = () => {
  const contentsMatch = useMatch("/:dataId");

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
