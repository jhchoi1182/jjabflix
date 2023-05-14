import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { IContent } from "../../../interface/Interface";
import { ItemCaptionWrapper, nthChild } from "../../atoms/Layout";
import { ButtonBox, ItemImageBanner, InfoBox, TagBox } from "../../molecules/Item";
import { captionVariants, contentVariants } from "../../atoms/Variants/Variants";

const Item: React.FC<IContent> = ({ ...data }) => {
  const { id, title, name, backdrop_path, poster_path, genres } = data;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HoverBigScaleContainer
      layoutId={"bookmark" + id}
      variants={contentVariants}
      whileHover={isHovered ? "hover" : "normal"}
      initial="normal"
      transition={{ type: "tween" }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ItemImageBanner
        onMouseEnter={() => setIsHovered(true)}
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

export default Item;

const HoverBigScaleContainer = styled(motion.div)`
  margin-bottom: -129px;
  ${nthChild}
`;
