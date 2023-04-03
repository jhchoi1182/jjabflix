import { motion } from "framer-motion";
import styled from "styled-components";
import { IBackdropProps } from "../../../Interface/CommonInterface";

const BackdropOverlay = ({ animate, exit, onClick }: IBackdropProps) => {
  return <Overlay animate={animate} exit={exit} onClick={onClick}></Overlay>;
};

export default BackdropOverlay;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
