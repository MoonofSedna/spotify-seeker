import React, { memo } from "react";
import ListItem from "./ListItem";
import DefaultImage from "../assets/images/default-album.png";

export default memo(function Albums({
  artists,
  images,
  name,
  release_date,
  total_tracks,
  id,
  external_urls,
}) {
  return (
    <ListItem
      imageUrl={images.length > 0 ? images[0]?.url : DefaultImage}
      id={id}
      name={name}
      externalUrl={external_urls?.spotify}
      releaseDate={release_date}
      totalTracks={total_tracks}
    />
  );
});
