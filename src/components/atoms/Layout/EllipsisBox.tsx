import { ChildrenProps } from "../../../interface/type";
import styled from "styled-components";

type EllipsisBoxProps = {
  width?: string;
};

const EllipsisBox: React.FC<EllipsisBoxProps & ChildrenProps> = ({ children, width }) => {
  return <EllipsisDiv width={width}>{children}</EllipsisDiv>;
};

export default EllipsisBox;

const EllipsisDiv = styled.div<EllipsisBoxProps>`
  width: ${({ width }) => (width ? width : "14rem")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
