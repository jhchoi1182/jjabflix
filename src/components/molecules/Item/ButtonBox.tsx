import * as Button from "../Button/CircleButton";
import { IContent } from "../../../interface/Interface";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { FavoriteAtom, detailSelector } from "../../../lib/atoms";
import { useBookmark, useTooltip } from "../../../utils/Hooks";
import { FlexDivLeft, FlexDivRight, FlexPaddingContainer } from "../../atoms/Layout";

interface IButtonBox extends IContent {
  onMouseEnter?: () => void;
  skeleton?: boolean;
  keyword?: string;
}

const ButtonBox: React.FC<IButtonBox> = ({ onMouseEnter, skeleton, keyword, ...data }) => {
  const { addFavoriteContents, removeFavoriteContents } = useBookmark();
  const { isHovered, showTooltipHandler, disappearTooltipHandler, renderTooltip } = useTooltip();
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
        <Button.CirclePlay
          data-tooltip-text="미지원"
          onClick={(event) => showTooltipHandler({ x: -9, size: "slideTooltip" }, event)}
          onMouseLeave={disappearTooltipHandler}
          buttonSize="slideButton"
        />
        {isAdded ? (
          <Button.CircleCheck
            data-tooltip-text="내가 찜한 콘텐츠에서 삭제"
            onMouseEnter={(event) => showTooltipHandler({ x: -37.5, size: "slideTooltip" }, event)}
            onMouseLeave={disappearTooltipHandler}
            onClick={() => removeFavoriteContents(data)}
            buttonSize="slideButton"
          />
        ) : (
          <Button.CircleAdd
            data-tooltip-text="내가 찜한 콘텐츠에 추가"
            onMouseEnter={(event) => showTooltipHandler({ x: -30, size: "slideTooltip" }, event)}
            onMouseLeave={disappearTooltipHandler}
            onClick={() => addFavoriteContents(data)}
            buttonSize="slideButton"
          />
        )}
      </FlexDivLeft>
      <FlexDivRight>
        <Button.CircleDetail
          data-tooltip-text="상세 정보"
          onMouseEnter={(event) => showTooltipHandler({ x: 225, size: "slideTooltip" }, event)}
          onMouseLeave={disappearTooltipHandler}
          onClick={showDetailHandler}
          buttonSize="slideButton"
        />
      </FlexDivRight>
      {isHovered && renderTooltip()}
    </FlexPaddingContainer>
  );
};

export default ButtonBox;
