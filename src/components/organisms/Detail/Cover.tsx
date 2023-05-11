import React from "react";
import styled from "styled-components";
import { bgImg } from "../../atoms/BannerImage";
import { big1, bold } from "../../../styles/Fonts";
import { useBookmark, useTooltip } from "../../../utils/Hooks";
import { useRecoilValue } from "recoil";
import { IContent } from "../../../interface/Interface";
import { FavoriteAtom } from "../../../lib/Atoms";
import { useNavigate } from "react-router-dom";
import { CircleAdd, CircleCheck } from "../../molecules/Button/CircleButton";
import { Play } from "../../molecules/Button/RectangleButton";
import { posterAPI } from "../../../api/Apis";

const Cover: React.FC<IContent> = ({ ...contentData }) => {
  const { isHovered, setTooltipHandler, resetTooltipHandler, renderTooltip } = useTooltip();
  const { addFavoriteContents, removeFavoriteContents } = useBookmark();
  const favoriteContents = useRecoilValue<IContent[]>(FavoriteAtom);
  const navigate = useNavigate();

  const { id, backdrop_path, poster_path, title, name } = contentData;
  const isAdded = favoriteContents.some((content) => content.id === id);

  return (
    <CoverBox bgimg={posterAPI(backdrop_path ?? poster_path, "w500")}>
      <Close onClick={() => navigate(-1)}>X</Close>
      <Title>{title || name}</Title>
      <ButtonBox>
        <Play buttonSize="detailButton" />
        {isAdded ? (
          <CircleCheck
            data-tooltip-text="내가 찜한 콘텐츠에서 삭제"
            onMouseEnter={(event) => setTooltipHandler({ top: 390, x: 130, size: "detailTooltip" }, event)}
            onMouseLeave={resetTooltipHandler}
            buttonSize="detailButton"
            onClick={() => removeFavoriteContents(contentData)}
          />
        ) : (
          <CircleAdd
            data-tooltip-text="내가 찜한 콘텐츠에 추가"
            onMouseEnter={(event) => setTooltipHandler({ top: 390, x: 121, size: "detailTooltip" }, event)}
            onMouseLeave={resetTooltipHandler}
            buttonSize="detailButton"
            onClick={() => addFavoriteContents(contentData)}
          />
        )}
        {isHovered && renderTooltip()}
      </ButtonBox>
    </CoverBox>
  );
};

export default Cover;

const CoverBox = styled.div<{ bgimg: string }>`
  position: relative;
  ${bgImg}
  background-image: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 0), rgba(24, 24, 24, 1)),
    url(${(props) => props.bgimg});
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 53px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Close = styled.button`
  position: absolute;
  top: 17px;
  right: 17px;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.lighter};
  font-size: 2rem;
  border: none;
  cursor: pointer;
`;

const Title = styled.h3`
  ${big1}
  ${bold}
  color: ${(props) => props.theme.white.lighter};
  width: 50%;
  margin-bottom: 2rem;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 2rem;
`;
