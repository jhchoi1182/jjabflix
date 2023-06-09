import styled from "styled-components";
import { font } from "../../../styles/Fonts";
import { useBookmark } from "../../../utils/Hooks";
import { useRecoilValue } from "recoil";
import { IContent } from "../../../interface/Interface";
import { FavoriteAtom } from "../../../lib/atoms";
import { CircleAdd, CircleCheck } from "../../molecules/Button/CircleButton";
import { Play } from "../../molecules/Button/RectangleButton";
import { posterAPI } from "../../../api/Apis";
import CloseButton from "../../atoms/Button/CloseButton";
import { ContentCoverImage } from "../../atoms/Layout";
import { theme } from "../../../styles/theme";

const Cover = ({ ...contentData }: IContent) => {
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
        <Play buttonSize="detailButton" />
        {isAdded ? (
          <CircleCheck buttonSize="detailButton" onClick={() => removeFavoriteContents(contentData)} />
        ) : (
          <CircleAdd buttonSize="detailButton" onClick={() => addFavoriteContents(contentData)} />
        )}
      </ButtonBox>
    </CoverBox>
  );
};

export default Cover;

const CoverBox = styled.div<{ bgimg: string }>`
  position: relative;
  ${ContentCoverImage}
  background-image: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 0), rgba(24, 24, 24, 1)),
    url(${({ bgimg }) => bgimg});
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 53px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

Cover.Title = styled.h3`
  ${font.RM_title}
  color: ${theme.white.lighter};
  width: 50%;
  margin-bottom: 2rem;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 2rem;
`;
