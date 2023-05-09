/** 마우스 호버 시 툴팁 */

import React, { useState } from "react";
import styled from "styled-components";
import { bold } from "../../styles/Fonts";

interface IUseTooltip {
  isHovered: boolean;
  onMouseEnterHandler: ({ text, left }: IonMouseEnterHandler) => void;
  onMouseLeaveHandler: () => void;
  renderTooltip: () => React.ReactNode;
}

interface IonMouseEnterHandler {
  text: string;
  left: number;
}

const useTooltip = (): IUseTooltip => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltip, setTooltip] = useState({ text: "", left: 0 });

  const onMouseEnterHandler = ({ text, left }: IonMouseEnterHandler) => {
    setIsHovered(true);
    setTooltip({ text, left });
  };

  const onMouseLeaveHandler = () => {
    setIsHovered(false);
    setTooltip({ text: "", left: 0 });
  };
  console.log(tooltip);

  const renderTooltip = () => {
    return <TooltipBox left={tooltip.left}>{tooltip.text}</TooltipBox>;
  };

  return {
    isHovered,
    onMouseEnterHandler,
    onMouseLeaveHandler,
    renderTooltip,
  };
};

export default useTooltip;

const TooltipBox = styled.div<{ left: number }>`
  position: absolute;
  padding: 7px 20px;
  background-color: ${(props) => props.theme.white.lighter};
  opacity: 0.95;
  color: ${(props) => props.theme.black.lighter};
  ${bold};
  border-radius: 4px;
  bottom: 3px;
  left: ${(props) => props.left}px;
  :before {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-width: 15px 15px 0px 15px;
    border-color: ${(props) => props.theme.white.lighter} transparent transparent transparent;
  }
`;
