import styled from "styled-components";
import { small2 } from "../../../../styles/Fonts";
import { flex } from "../../../../styles/css";

/** ButtonBox의 레이아웃 */
export const FlexPaddingContainer = styled.div`
  display: flex;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

export const FlexDivLeft = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FlexDivRight = styled.div`
  margin-left: auto;
`;

/** InfoBox의 레이아웃 */
export const Information = styled.div`
  ${flex("none")}
  ${small2}
  gap: 0.6rem;
  margin-top: 1.5rem;
`;

/** TagBox의 레이아웃 */
export const Tag = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  ${small2}
  li {
    position: relative;
  }
  li:not(:first-child) {
    padding-left: 1rem;
  }
  li:not(:first-child)::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: ${(props) => props.theme.grey.darker};
    border-radius: 100%;
  }
`;
