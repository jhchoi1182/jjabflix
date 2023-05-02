import React from "react";
import styled from "styled-components";
import * as Button from "../../molecules/Button/CircleButton";
import { FavoriteAtom, IDetail, detailAtom } from "../../../lib/Atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { setFavoriteLocal } from "../../../utils/Local";
import { useButtonOpacity } from "../../../utils/hooks";

const SlideButtonBox: React.FC<IDetail> = ({ ...data }) => {
  const [favoriteContents, setFavoriteContents] = useRecoilState(FavoriteAtom);
  const setContentData = useSetRecoilState(detailAtom);
  const navigate = useNavigate();
  const { setButtonOpacity } = useButtonOpacity();

  const isAdded = favoriteContents.some((content) => content.id === data.id);

  const showDetailHandler = () => {
    if (data) {
      setContentData(data);
      navigate(`/${data.id}`);
    }
  };

  const setFavoriteHandler = (data: IDetail[]) => {
    setFavoriteContents(data);
    setFavoriteLocal(data);
  };

  const addFavoriteContents = () => {
    if (data) {
      const addedContents = [data, ...favoriteContents];
      setFavoriteHandler(addedContents);
    }
  };

  const removeFavoriteContens = () => {
    if (data) {
      const removedContents = favoriteContents.filter((content) => content.id !== data.id);
      setFavoriteHandler(removedContents);
    }
  };

  return (
    <ButtonBox onMouseEnter={() => setButtonOpacity(0)}>
      <FlexLeftDiv>
        <Button.CirclePlay />
        {isAdded ? (
          <Button.CircleCheck onClick={removeFavoriteContens} />
        ) : (
          <Button.CircleAdd onClick={addFavoriteContents} />
        )}
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
