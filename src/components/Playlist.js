import React, { memo } from "react";
import ListItem from "./ListItem";
import DefaultImage from "../assets/images/default-album.png";

export default memo(function PlayList({
  images,
  name,
  id,
  external_urls,
  owner,
  tracks,
}) {
  return (
    <ListItem
      imageUrl={images.length > 0 ? images[0]?.url : DefaultImage}
      id={id}
      name={name}
      externalUrl={external_urls?.spotify}
      owner={owner.display_name}
      totalTracks={tracks.total}
    />
  );
});
