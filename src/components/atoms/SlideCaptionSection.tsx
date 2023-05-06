import styled from "styled-components";
import { motion } from "framer-motion";

const SlideItemCaptionSection = styled(motion.div)`
  padding: 1.5rem;
  background-color: ${(props) => props.theme.black.veryDark};
  margin-top: -0.1rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  opacity: 0;
  pointer-events: none;
`;

export default SlideItemCaptionSection;
