import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryAtom } from "../../../lib/atoms";

export interface ArrowProps {
  direction: "prev" | "next";
  category?: string;
}

const nextArrow = "\u276F"; /** ❯ */
const prevArrow = "\u276E"; /** ❮ */

const Arrow: React.FC<ArrowProps> = ({ direction, category }) => {
  const hoveredCategory = useRecoilValue(categoryAtom);

  const arrow = direction === "next" ? nextArrow : prevArrow;

  return <ArrowStyle className={category === hoveredCategory ? "slide-hover" : "pagination-item"}>{arrow}</ArrowStyle>;
};

export default Arrow;

const ArrowStyle = styled.div`
  font-size: 3rem;
  color: ${(props) => props.theme.white.lighter};
  &:hover {
    font-size: 4rem;
  }
`;
