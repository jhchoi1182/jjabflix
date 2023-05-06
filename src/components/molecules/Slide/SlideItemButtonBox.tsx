import React, { useCallback } from "react";
import styled from "styled-components";
import * as Button from "../Button/CircleButton";
import { IContent } from "../../../interface/Interface";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { setFavoriteLocal } from "../../../utils/Local";
import { FavoriteAtom, detailAtom } from "../../../lib/Atoms";

interface ISlideItemButtonBox extends IContent {
  onMouseEnter?: () => void;
  skeleton?: boolean;
}

const SlideItemButtonBox: React.FC<ISlideItemButtonBox> = ({ onMouseEnter, skeleton, ...data }) => {
  const { id } = data;

  const [favoriteContents, setFavoriteContents] = useRecoilState(FavoriteAtom);
  const setContentData = useSetRecoilState(detailAtom);
  const navigate = useNavigate();

  const isAdded = favoriteContents.some((content) => content.id === id);

  const showDetailHandler = () => {
    if (data) {
      setContentData(data);
      navigate(`/${id}`);
    }
  };

  const setFavoriteHandler = useCallback(
    (data: IContent[]) => {
      setFavoriteContents(data);
      setFavoriteLocal(data);
    },
    [setFavoriteContents]
  );

  const addFavoriteContents = useCallback(() => {
    if (data) {
      const addedContents = [data, ...favoriteContents];
      setFavoriteHandler(addedContents);
    }
  }, [isAdded]);

  const removeFavoriteContens = useCallback(() => {
    if (data) {
      const removedContents = favoriteContents.filter((content) => content.id !== id);
      setFavoriteHandler(removedContents);
    }
  }, [isAdded]);

  return (
    <ButtonBox onMouseEnter={onMouseEnter}>
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

export default SlideItemButtonBox;

export const ButtonBox = styled.div`
  display: flex;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

export const FlexLeftDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FlexRightBox = styled.div`
  margin-left: auto;
`;
