import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { IContent } from "../../../interface/Interface";
import { ItemCaptionWrapper, nthChild } from "../../atoms/Layout";
import { ButtonBox, ItemImageBanner, InfoBox, TagBox } from "../../molecules/Item";
import { captionVariants, contentVariants } from "../../atoms/Variants/Variants";

const BookmarkedItem = ({ ...data }: IContent) => {
  const { id, title, name, backdrop_path, poster_path, genres } = data;
  const control = useAnimation();

  return (
    <HoverBigScaleContainer
      layoutId={"bookmark" + id}
      variants={contentVariants}
      animate={control}
      initial="normal"
      transition={{ type: "tween" }}
      onMouseLeave={() => control.start("normal")}
    >
      <ItemImageBanner
        onMouseEnter={() => control.start("hover")}
        backdrop={backdrop_path}
        poster={poster_path}
        title={title}
        name={name}
      />
      <ItemCaptionWrapper variants={captionVariants}>
        <ButtonBox {...data} />
        <InfoBox {...data} />
        <TagBox genres={genres} />
      </ItemCaptionWrapper>
    </HoverBigScaleContainer>
  );
};

export default BookmarkedItem;

const HoverBigScaleContainer = styled(motion.div)`
  margin-bottom: -129px;
  ${nthChild}
`;
