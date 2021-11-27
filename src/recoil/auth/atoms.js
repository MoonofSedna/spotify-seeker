import { atom } from "recoil";

export const isAuthenticated = atom({
  key: "isAuthenticated",
  default: false,
});

export const spotifyRefreshToken = atom({
  key: "spotifyRefreshToken",
  default: null,
});

export const spotifyTokenResponse = atom({
  key: "spotifyTokenResponse",
  default: null,
});
