/** 마우스 호버 시 툴팁 */

import React, { useState, MouseEvent } from "react";
import styled, { css } from "styled-components";
import { normal2 } from "../../styles/Fonts";

interface IUseTooltip {
  isHovered: boolean;
  setTooltipHandler: (x: IsetTooltipHandler, event: MouseEvent<HTMLElement>) => void;
  resetTooltipHandler: () => void;
  renderTooltip: () => React.ReactNode;
}

interface IsetTooltipHandler {
  text?: string;
  top?: number;
  x: number;
  size: "slideTooltip" | "detailTooltip";
}

const useTooltip = (): IUseTooltip => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltip, setTooltip] = useState<IsetTooltipHandler>({ text: "", top: 0, x: 0, size: "slideTooltip" });

  const setTooltipHandler = ({ x, size }: IsetTooltipHandler, event: MouseEvent<HTMLElement>) => {
    setIsHovered(true);
    setTooltip({
      text: event.currentTarget.dataset.tooltipText ?? "",
      top: event.currentTarget.offsetTop ?? 0,
      x,
      size,
    });
  };

  const resetTooltipHandler = () => {
    setIsHovered(false);
    setTooltip({ text: "", top: 0, x: 0, size: "slideTooltip" });
  };

  const renderTooltip = () => {
    return (
      <TooltipBox x={tooltip.x} top={tooltip.top} size={tooltip.size}>
        {tooltip.text}
      </TooltipBox>
    );
  };

  return {
    isHovered,
    setTooltipHandler,
    resetTooltipHandler,
    renderTooltip,
  };
};

export default useTooltip;

const slideTooltip = css`
  padding: 7px 20px;
  ${normal2}
`;
const detailTooltip = css``;
const tooltipSize = { slideTooltip, detailTooltip };

const TooltipBox = styled.div<IsetTooltipHandler>`
  position: absolute;
  background-color: ${(props) => props.theme.white.lighter};
  opacity: 0.95;
  border-radius: 4px;
  color: ${(props) => props.theme.black.lighter};
  top: ${(props) => props.top && props.top - 50}px;
  ${(props) => props.size && tooltipSize[props.size]}
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
