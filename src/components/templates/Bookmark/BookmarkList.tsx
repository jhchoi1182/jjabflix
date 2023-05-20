import { useRecoilValue } from "recoil";
import BookmarkedItem from "../../organisms/Item/BookmarkedItem";
import { FavoriteAtom } from "../../../lib/atoms";
import { ItemGridContainer } from "../../atoms/Layout";

const BookmarkList = () => {
  const favoriteContents = useRecoilValue(FavoriteAtom);

  return (
    <ItemGridContainer>
      {favoriteContents?.map((data) => (
        <BookmarkedItem key={data.id} {...data} />
      ))}
    </ItemGridContainer>
  );
};

export default BookmarkList;
