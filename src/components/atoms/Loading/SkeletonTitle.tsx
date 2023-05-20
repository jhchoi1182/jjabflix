import styled from "styled-components";

const SkeletonTitle = () => {
  return <TitleDiv />;
};

export default SkeletonTitle;

const TitleDiv = styled.div`
  width: 160px;
  height: 35px;
  border-radius: 5px;
  background-color: rgb(25, 25, 25);
`;
