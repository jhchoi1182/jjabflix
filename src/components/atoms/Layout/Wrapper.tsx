import styled from "styled-components";
import { ChildrenProps } from "../../../interface/Interface";

const Wrapper = ({ children }: ChildrenProps) => {
  return <WrapperDiv>{children}</WrapperDiv>;
};

export default Wrapper;

const WrapperDiv = styled.div`
  overflow: hidden;
`;
