import React, { memo } from "react";
import ListItem from "./ListItem";
import DefaultImage from "../assets/images/default-artist.png";

export default memo(function Artists({
  images,
  name,
  id,
  external_urls,
  followers,
}) {
  return (
    <ListItem
      imageUrl={images.length > 0 ? images[0]?.url : DefaultImage}
      id={id}
      name={name}
      externalUrl={external_urls?.spotify}
      followers={followers.total}
    />
  );
});
