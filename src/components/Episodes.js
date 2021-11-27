import React, { memo } from "react";
import ListItem from "./ListItem";
import DefaultImage from "../assets/images/default-artist.png";

export default memo(function Episodes({
  images,
  name,
  id,
  external_urls,
  release_date,
}) {
  return (
    <ListItem
      imageUrl={images.length > 0 ? images[0]?.url : DefaultImage}
      id={id}
      name={name}
      externalUrl={external_urls?.spotify}
      releaseDate={release_date}
    />
  );
});
