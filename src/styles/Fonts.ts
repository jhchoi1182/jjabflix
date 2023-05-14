import { css } from "styled-components";

/** FontWeight */
export const fontWeight = {
  Bold: 500,
  Heavy: 700,
};

/** FontSize */
export const fontSize = {
  Big1: "3.5vw",
  Big2: "5vw",
  Large: "2vw",
  LargeRem: "3.8rem",
  Mid1: "1.2vw",
  Mid2: "1.3vw",
  Mid2Rem: "2.6rem",
  Mid3: "1.4vw",
  Normal1: "1.4rem",
  Normal2: "1.7rem",
  Normal3: "0.84vw",
  Small1: "1rem",
  Small2: "1.1rem",
  Small3: "1.2rem",
};

/** Font */
/** R 접두사 - 반응형 폰트 */
/** S 접두사 - 스몰 */
/** M 접두사  - 미디움 */
/** L 접두사 - 라지 */
export const font = {
  item_text: css`
    font-size: ${fontSize.Small2};
    font-weight: ${fontWeight.Bold};
  `,
  footer_menu: css`
    font-size: ${fontSize.Normal1};
    font-weight: ${fontWeight.Bold};
  `,
  footer_text: css`
    font-size: ${fontSize.Small3};
    font-weight: ${fontWeight.Bold};
  `,
  RS_tooltip_text: css`
    font-size: ${fontSize.Normal3};
    font-weight: ${fontWeight.Bold};
  `,
  RM_tooltip_text: css`
    font-size: ${fontSize.Mid1};
    font-weight: ${fontWeight.Bold};
  `,
  R_slide_title: css`
    font-size: ${fontSize.Mid3};
    font-weight: ${fontWeight.Bold};
  `,
  R_page_title: css`
    font-size: ${fontSize.Large};
    font-weight: ${fontWeight.Bold};
  `,
  page_title: css`
    font-size: ${fontSize.LargeRem};
    font-weight: ${fontWeight.Bold};
  `,
  S_overview: css`
    font-size: ${fontSize.Normal2};
    font-weight: ${fontWeight.Bold};
  `,
  L_overview: css`
    font-size: ${fontSize.Mid2};
    font-weight: ${fontWeight.Bold};
  `,
  RS_title: css`
    font-size: ${fontSize.Mid2};
    font-weight: ${fontWeight.Heavy};
  `,
  S_title: css`
    font-size: ${fontSize.Mid2Rem};
    font-weight: ${fontWeight.Bold};
  `,
  RM_title: css`
    font-size: ${fontSize.Big1};
    font-weight: ${fontWeight.Bold};
  `,
  RL_title: css`
    font-size: ${fontSize.Big2};
    font-weight: ${fontWeight.Bold};
  `,
};
