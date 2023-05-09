/** 마우스 호버 시 툴팁 */

import React, { useState } from "react";
import styled, { css } from "styled-components";
import { bold } from "../../styles/Fonts";

interface IUseTooltip {
  isHovered: boolean;
  setTooltipHandler: ({ text, x }: IonMouseEnterHandler) => void;
  resetTooltipHandler: () => void;
  renderTooltip: () => React.ReactNode;
}

interface IonMouseEnterHandler {
  text: string;
  x: number;
}

const useTooltip = (): IUseTooltip => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltip, setTooltip] = useState({ text: "", x: 0 });

  const setTooltipHandler = ({ text, x }: IonMouseEnterHandler) => {
    setIsHovered(true);
    setTooltip({ text, x });
  };

  const resetTooltipHandler = () => {
    setIsHovered(false);
    setTooltip({ text: "", x: 0 });
  };

  const renderTooltip = () => {
    return <TooltipBox x={tooltip.x}>{tooltip.text}</TooltipBox>;
  };

  return {
    isHovered,
    setTooltipHandler,
    resetTooltipHandler,
    renderTooltip,
  };
};

export default useTooltip;

const TooltipBox = styled.div<{ x: number }>`
  position: absolute;
  padding: 7px 20px;
  background-color: ${(props) => props.theme.white.lighter};
  opacity: 0.95;
  color: ${(props) => props.theme.black.lighter};
  ${bold};
  border-radius: 4px;
  bottom: 3px;
  ${(props) => {
    switch (true) {
      case props.x < 0:
        return css`
          left: ${props.x}px;
        `;
      case props.x > 0:
        return css`
          right: calc(71% - ${props.x}px);
        `;
      default:
        return css``;
    }
  }}
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
