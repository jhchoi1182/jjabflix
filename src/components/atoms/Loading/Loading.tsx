import styled from "styled-components";
import { flex } from "../../../styles/Css";

const Loading = () => {
  return <LoadingBox>로딩 중...</LoadingBox>;
};

export default Loading;

const LoadingBox = styled.div`
  height: 20vh;
  ${flex()}
`;
