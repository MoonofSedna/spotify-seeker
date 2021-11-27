import React, { memo } from "react";
import ListItem from "./ListItem";
import DefaultImage from "../assets/images/default-track.png";

export default memo(function Track({
  album,
  artists,
  name,
  id,
  external_urls,
}) {
  return (
    <ListItem
      imageUrl={album.images.length > 0 ? album?.images[0]?.url : DefaultImage}
      id={id}
      name={name}
      externalUrl={external_urls?.spotify}
      releaseDate={album?.release_date}
      artist={artists[0]?.name}
    />
  );
});
