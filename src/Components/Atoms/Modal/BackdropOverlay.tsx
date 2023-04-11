import { motion } from "framer-motion";
import styled from "styled-components";

interface IBackdropProps {
  animate?: { opacity: number };
  exit?: { opacity: number };
  onClick(): void;
}

const BackdropOverlay: React.FC<IBackdropProps> = ({ animate, exit, onClick }) => {
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
