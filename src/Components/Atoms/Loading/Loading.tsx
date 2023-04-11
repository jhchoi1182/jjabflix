import styled from "styled-components";
import { flex } from "../../../Styles/Css";

const Loading = () => {
  return <LoadingBox>로딩 중...</LoadingBox>;
};

export default Loading;

const LoadingBox = styled.div`
  height: 20vh;
  ${flex()}
`;
