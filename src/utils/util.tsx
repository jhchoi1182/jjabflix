import { css } from "styled-components";

export const flex = (
  justifyContent = "",
  alignItems = "",
) => {
  const jc = () => {
    switch (justifyContent) {
      case "space-between":
        return "space-between";
      case "space-evenly":
        return "space-evenly";
      case "flex-start":
        return "flex-start";
      default:
        return "center";
    }
  };

  const ai = () => {
    switch (alignItems) {
      case "flex-start":
        return "flex-start";
      default:
        return "center";
    }
  };

  return css`
    display: flex;
    justify-content: ${jc()};
    align-items: ${ai()};
  `;
};