import styled from "styled-components";

export interface ArrowProps {
  direction: "prev" | "next";
}

const Arrow: React.FC<ArrowProps> = ({ direction }) => {
  return (
    <ArrowStyle className="slide-hover">
      {direction === "next" ? String.fromCharCode(10095) : String.fromCharCode(10094)}
    </ArrowStyle>
  );
};

export default Arrow;

const ArrowStyle = styled.div`
  width: 100%;
  font-size: 3rem;
  color: ${(props) => props.theme.white.lighter};
  &:hover {
    font-size: 4rem;
  }
`;
