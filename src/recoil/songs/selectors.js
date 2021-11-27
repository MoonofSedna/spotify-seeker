import { selector } from "recoil";
import {
  album as albumAtom,
  artist as artistAtom,
  playlist as playlistAtom,
  episode as episodeAtom,
} from "./atoms";

export const filterType = selector({
  key: "filterType",
  get: ({ get }) => {
    const atoms = [
      get(albumAtom),
      get(artistAtom),
      get(playlistAtom),
      get(episodeAtom),
    ];
    const notNullAtoms = atoms.filter((atom) => !!atom);
    return notNullAtoms.length ? notNullAtoms.join(",") : "";
  },
  set: ({ set }) => {
    set(albumAtom, null);
    set(artistAtom, null);
    set(playlistAtom, null);
    set(episodeAtom, null);
  },
});
