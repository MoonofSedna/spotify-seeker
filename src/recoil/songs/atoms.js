import { atom } from "recoil";

export const spotifyResults = atom({
  key: "spotifyResults",
  default: undefined,
});

export const album = atom({
  key: "album",
  default: undefined,
});

export const artist = atom({
  key: "artist",
  default: undefined,
});

export const playlist = atom({
  key: "playlist",
  default: undefined,
});

export const episode = atom({
  key: "episodes",
  default: undefined,
});
