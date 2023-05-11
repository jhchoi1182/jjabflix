/** 마우스 호버 시 툴팁 */

import React, { useState, MouseEvent } from "react";
import styled, { css } from "styled-components";
import { bold, mid1, normal2 } from "../../styles/Fonts";

interface IUseTooltip {
  isHovered: boolean;
  showTooltipHandler: (x: IshowTooltipHandler, event: MouseEvent<HTMLElement>) => void;
  disappearTooltipHandler: () => void;
  renderTooltip: () => React.ReactNode;
}

interface IshowTooltipHandler {
  text?: string;
  top?: number;
  x: number;
  size: "slideTooltip" | "detailTooltip";
}

const useTooltip = (): IUseTooltip => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltip, setTooltip] = useState<IshowTooltipHandler>({ text: "", top: 0, x: 0, size: "slideTooltip" });

  const showTooltipHandler = ({ top, x, size }: IshowTooltipHandler, event: MouseEvent<HTMLElement>) => {
    setIsHovered(true);
    setTooltip({
      text: event.currentTarget.dataset.tooltipText ?? "",
      top: top ?? event.currentTarget.offsetTop,
      x,
      size,
    });
  };

  const disappearTooltipHandler = () => {
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
    showTooltipHandler,
    disappearTooltipHandler,
    renderTooltip,
  };
};

export default useTooltip;

const slideTooltip = css`
  padding: 7px 20px;
  ${normal2}
`;
const detailTooltip = css`
  padding: 7px 20px;
  ${mid1}
  ${bold}
`;
const tooltipSize = { slideTooltip, detailTooltip };

const TooltipBox = styled.div<IshowTooltipHandler>`
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
