import React from "react";
import styled from "styled-components";
import * as Button from "../../molecules/Button/CircleButton";
import { IDetail, detailAtom } from "../../../lib/Atoms";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const SlideButtonBox: React.FC<IDetail> = ({ ...data }) => {
  const setContentData = useSetRecoilState(detailAtom);
  const navigate = useNavigate();

  const showDetailHandler = () => {
    if (data) {
      setContentData(data);
      navigate(`/${data.id}`);
    }
  };

  const addFavoriteContents = () => {
    if (data) {
    }
  };

  return (
    <ButtonBox>
      <FlexLeftDiv>
        <Button.CirclePlay />
        <Button.CircleAdd onClick={addFavoriteContents} />
      </FlexLeftDiv>
      <FlexRightBox>
        <Button.CircleDetail onClick={showDetailHandler} />
      </FlexRightBox>
    </ButtonBox>
  );
};

export default SlideButtonBox;

const ButtonBox = styled.div`
  display: flex;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

const FlexLeftDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FlexRightBox = styled.div`
  margin-left: auto;
`;
