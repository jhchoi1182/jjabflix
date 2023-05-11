import { css } from "styled-components";

/** Layouts */
export const flex = (justifyContent = "center", alignItems = "center") => {
  const jc = () => {
    switch (justifyContent) {
      case "space-between":
        return "space-between";
      case "space-evenly":
        return "space-evenly";
      case "flex-start":
        return "flex-start";
      case "center":
        return "center";
      case "none":
        return "none";
      default:
        throw new Error(`설정된 ${justifyContent}값이 없습니다. ${justifyContent}를 추가해주세요.`);
    }
  };

  const ai = () => {
    switch (alignItems) {
      case "flex-start":
        return "flex-start";
      case "end":
        return "end";
      case "center":
        return "center";
      default:
        throw new Error(`설정된 ${alignItems}값이 없습니다. ${alignItems}를 추가해주세요.`);
    }
  };

  const justifyContentValue = justifyContent === "none" ? "" : `justify-content: ${jc()};`;

  return css`
    display: flex;
    ${justifyContentValue}
    align-items: ${ai()};
  `;
};
