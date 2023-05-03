import styled from "styled-components";
import { motion } from "framer-motion";

const SlideCaptionSection = styled(motion.div)`
  padding: 1.5rem;
  background-color: ${(props) => props.theme.black.veryDark};
  display: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-top: -0.1rem;
`;

export default SlideCaptionSection;
