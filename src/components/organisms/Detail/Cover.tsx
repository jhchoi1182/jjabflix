import React from "react";
import styled from "styled-components";
import { bgImg } from "../../atoms/BannerImage";
import { big1, bold } from "../../../styles/Fonts";
import { useBookmark, useTooltip } from "../../../utils/Hooks";
import { useRecoilValue } from "recoil";
import { IContent } from "../../../interface/Interface";
import { FavoriteAtom } from "../../../lib/atoms";
import { CircleAdd, CircleCheck } from "../../molecules/Button/CircleButton";
import { Play } from "../../molecules/Button/RectangleButton";
import { posterAPI } from "../../../api/Apis";
import CloseButton from "../../atoms/Button/CloseButton";
import { ChildrenProps } from "../../../interface/type";

const Cover: React.FC<IContent> & {
  Title: React.FC<ChildrenProps>;
} = ({ ...contentData }) => {
  const { isHovered, showTooltipHandler, disappearTooltipHandler, renderTooltip } = useTooltip();
  const { addFavoriteContents, removeFavoriteContents } = useBookmark();
  const favoriteContents = useRecoilValue<IContent[]>(FavoriteAtom);

  const { id, backdrop_path, poster_path, title, name } = contentData;

  /** 즐겨찾기된 콘텐츠인지 */
  const isAdded = favoriteContents.some((content) => content.id === id);

  return (
    <CoverBox bgimg={posterAPI(backdrop_path ?? poster_path, "w500")}>
      <CloseButton top="17px" right="17px" size="detailButton" />
      <Cover.Title>{title || name}</Cover.Title>
      <ButtonBox>
        <Play
          data-tooltip-text="지원하지 않는 기능입니다."
          onClick={(event) => showTooltipHandler({ top: 390, x: -15, size: "detailTooltip" }, event)}
          onMouseLeave={disappearTooltipHandler}
          buttonSize="detailButton"
        />
        {isAdded ? (
          <CircleCheck
            data-tooltip-text="내가 찜한 콘텐츠에서 삭제"
            onMouseEnter={(event) => showTooltipHandler({ top: 390, x: 130, size: "detailTooltip" }, event)}
            onMouseLeave={disappearTooltipHandler}
            buttonSize="detailButton"
            onClick={() => removeFavoriteContents(contentData)}
          />
        ) : (
          <CircleAdd
            data-tooltip-text="내가 찜한 콘텐츠에 추가"
            onMouseEnter={(event) => showTooltipHandler({ top: 390, x: 121, size: "detailTooltip" }, event)}
            onMouseLeave={disappearTooltipHandler}
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

Cover.Title = styled.h3`
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
