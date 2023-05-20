import * as Button from "../Button/CircleButton";
import { IContent } from "../../../interface/Interface";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { FavoriteAtom, detailSelector } from "../../../lib/atoms";
import { useBookmark } from "../../../utils/Hooks";
import { FlexDivLeft, FlexDivRight, FlexPaddingContainer } from "../../atoms/Layout";

interface IButtonBox extends IContent {
  onMouseEnter?: () => void;
  skeleton?: boolean;
  keyword?: string;
}

const ButtonBox = ({ onMouseEnter, skeleton, keyword, ...data }: IButtonBox) => {
  const { addFavoriteContents, removeFavoriteContents } = useBookmark();
  const favoriteContents = useRecoilValue(FavoriteAtom);
  const setDetail = useSetRecoilState(detailSelector);
  const navigate = useNavigate();
  const { id } = data;

  /** 즐겨찾기된 콘텐츠인지 */
  const isAdded = favoriteContents.some((content) => content.id === id);

  /** 상세 정보 모달 띄우기 */
  const showDetailHandler = () => {
    if (data) {
      setDetail(data);
      if (keyword) {
        navigate(`/search?keyword=${keyword}/${id}`);
      } else {
        navigate(`${id}`);
      }
    }
  };

  return (
    <FlexPaddingContainer onMouseEnter={onMouseEnter}>
      <FlexDivLeft>
        <Button.CirclePlay buttonSize="slideButton" />
        {isAdded ? (
          <Button.CircleCheck onClick={() => removeFavoriteContents(data)} buttonSize="slideButton" />
        ) : (
          <Button.CircleAdd onClick={() => addFavoriteContents(data)} buttonSize="slideButton" />
        )}
      </FlexDivLeft>
      <FlexDivRight>
        <Button.CircleDetail onClick={showDetailHandler} buttonSize="slideButton" />
      </FlexDivRight>
    </FlexPaddingContainer>
  );
};

export default ButtonBox;
