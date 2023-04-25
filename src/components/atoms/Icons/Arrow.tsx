import styled from "styled-components";

export interface ArrowProps {
  direction: "prev" | "next";
}

const Arrow: React.FC<ArrowProps> = ({ direction }) => {
  return <ArrowStyle className="slide-hover">{direction === "next" ? "&#10094;" : "&#10095;"}</ArrowStyle>;
};

export default Arrow;

const ArrowStyle = styled.div`
  font-size: 3rem;
  color: ${(props) => props.theme.white.lighter};
  &:hover {
    font-size: 4rem;
  }
`;
