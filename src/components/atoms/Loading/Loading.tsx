import styled from "styled-components";
import { flex } from "../../../styles/css";

const Loading = () => {
  return <LoadingBox>로딩 중...</LoadingBox>;
};

export default Loading;

const LoadingBox = styled.div`
  ${flex()}
`;
