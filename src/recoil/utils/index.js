import {
  spotifyRefreshToken,
  spotifyTokenResponse,
  isAuthenticated,
} from "../auth/atoms";

export const keysAbleToSave = [
  "spotifyRefreshToken",
  "spotifyTokenResponse",
  "isAuthenticated",
];

const atomsToSave = [
  {
    key: keysAbleToSave[0],
    atom: spotifyRefreshToken,
  },
  {
    key: keysAbleToSave[1],
    atom: spotifyTokenResponse,
  },
  {
    key: keysAbleToSave[2],
    atom: isAuthenticated,
  },
];

export const initRecoilState = ({ set }) => {
  const localStorageLength = localStorage.length;

  for (let i = 0; i < localStorageLength; i++) {
    const localStorageKey = localStorage.key(i);
    const indexOfKey = keysAbleToSave.indexOf(localStorageKey);
    if (indexOfKey !== -1) {
      const atom = atomsToSave[indexOfKey].atom;
      const atomData = JSON.parse(localStorage.getItem(localStorageKey)).value;
      set(atom, atomData);
    }
  }
};
