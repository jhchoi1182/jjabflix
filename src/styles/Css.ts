import { css } from "styled-components";

/** Layouts */
export const flex = (justifyContent = "", alignItems = "") => {
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
  font-size: 2.6rem;
  font-weight: 700;
`;

export const LargeOverview = css`
  font-size: 2.5rem;
  font-weight: 500;
`;

export const SmallOverview = css``;
