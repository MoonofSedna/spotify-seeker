import React, { memo } from "react";
// styles
import "./styles.css";

export default memo(function ListItem({
  imageUrl,
  id,
  externalUrl,
  artist,
  name,
  releaseDate,
  followers,
  totalTracks,
  owner,
}) {
  const handleListItem = () => {
    window.open(externalUrl, "_blank");
  };
  return (
    <div className="card-list" onClick={handleListItem}>
      <img src={imageUrl} alt={id} />
      <div className="text-container">
        <p className="list-name">{name}</p>
        <p className="list-artist">{artist}</p>
        {!!releaseDate && <p className="list-date">{releaseDate}</p>}
        {!!followers && <p className="list-date">Followers: {followers}</p>}
        {!!totalTracks && <p className="list-date">Tracks: {totalTracks}</p>}
        {!!owner && <p className="list-date">Owner: {owner}</p>}
      </div>
    </div>
  );
});
