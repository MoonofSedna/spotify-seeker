import { useRecoilState } from "recoil";
// atoms
import {
  album as albumAtom,
  artist as artistAtom,
  playlist as playlistAtom,
  episode as episodeAtom,
} from "../../recoil/songs/atoms";
// styles
import "./styles.css";

export default function HomeFilters() {
  const [album, setAlbum] = useRecoilState(albumAtom);
  const [artist, setArtist] = useRecoilState(artistAtom);
  const [playlist, setPlaylist] = useRecoilState(playlistAtom);
  const [episode, setEpisode] = useRecoilState(episodeAtom);

  return (
    <div className="home-filters">
      <label>
        Album
        <input
          type="checkbox"
          checked={!!album}
          onChange={({ target }) => setAlbum(target.checked ? "album" : null)}
        />
      </label>
      <label>
        Artist
        <input
          checked={!!artist}
          onChange={({ target }) => setArtist(target.checked ? "artist" : null)}
          type="checkbox"
        />
      </label>
      <label>
        Playlists
        <input
          checked={!!playlist}
          onChange={({ target }) =>
            setPlaylist(target.checked ? "playlist" : null)
          }
          type="checkbox"
        />
      </label>
      <label>
        Episode
        <input
          checked={!!episode}
          onChange={({ target }) =>
            setEpisode(target.checked ? "episode" : null)
          }
          type="checkbox"
        />
      </label>
    </div>
  );
}
