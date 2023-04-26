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
        throw new Error(`유효한 ${justifyContent}값이 입력되지 않았습니다.`);
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
        throw new Error(`유효한 ${alignItems}값이 입력되지 않았습니다.`);
    }
  };

  const justifyContentValue = justifyContent === "none" ? "" : `justify-content: ${jc()};`;

  return css`
    display: flex;
    ${justifyContentValue}
    align-items: ${ai()};
  `;
};

/** Fonts */
export const LargeTitle = css`
  font-size: 6rem;
  font-weight: 700;
`;

export const MidTitle = css`
  font-size: 4.6rem;
  font-weight: 700;
`;

export const SmallTitle = css`
  font-size: 1.35vw;
  font-weight: 700;
`;

export const SlideTitle = css`
  font-size: 1.4vw;
  font-weight: 500;
`;

export const LargeOverview = css`
  font-size: 2.5rem;
  font-weight: 500;
`;

export const SmallOverview = css``;
