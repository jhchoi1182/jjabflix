import styled from "styled-components";
import { ChildrenProps } from "../../../interface/Interface";

interface EllipsisBoxProps extends ChildrenProps {
  width?: string;
}

const EllipsisBox = ({ children, width }: EllipsisBoxProps) => {
  return <EllipsisDiv width={width}>{children}</EllipsisDiv>;
};

export default EllipsisBox;

const EllipsisDiv = styled.div<EllipsisBoxProps>`
  width: ${({ width }) => (width ? width : "14rem")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
