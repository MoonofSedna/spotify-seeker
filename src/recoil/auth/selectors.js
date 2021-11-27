import { selector } from "recoil";
import {
  isAuthenticated,
  spotifyRefreshToken,
  spotifyTokenResponse,
} from "./atoms";

export const signOut = selector({
  key: "signOut",
  get: ({ get }) => {},
  set: ({ set }) => {
    set(isAuthenticated, false);
    set(spotifyRefreshToken, null);
    set(spotifyTokenResponse, null);
    localStorage.clear();
  },
});
