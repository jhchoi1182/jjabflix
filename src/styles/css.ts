import { css } from "styled-components";

/** display:flex랑 같이 자주 쓰이는 css 함수화 */
export const flex = (justifyContent = "center", alignItems = "center") => {
  const justifyContentValue = {
    "space-between": "space-between",
    "space-evenly": "space-evenly",
    "flex-start": "flex-start",
    center: "center",
    none: "none",
  }[justifyContent];

  const alignItemsValue = {
    "flex-start": "flex-start",
    end: "end",
    center: "center",
  }[alignItems];

  return css`
    display: flex;
    ${justifyContentValue && `justify-content: ${justifyContentValue};`}
    align-items: ${alignItemsValue};
  `;
};
