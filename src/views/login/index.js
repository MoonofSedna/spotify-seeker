/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
// recoil
import {
  isAuthenticated as isAuthenticatedAtom,
  spotifyRefreshToken as spotifyRefreshTokenAtom,
  spotifyTokenResponse as spotifyTokenResponseAtom,
} from "../../recoil/auth/atoms";
//logo
import logo from "../../assets/images/home-logo.png";
// styles
import "./styles.css";
// utils
import { spotifyUrl } from "../../utils/spotify-url";
import { spotifyAuthCall } from "../../utils";
import { signOut } from "../../recoil/auth/selectors";
// components
import Spinner from "../../components/Spinner";

export default function Login() {
  const location = useLocation();
  const history = useNavigate();

  const [loading, setLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useRecoilState(
    spotifyRefreshTokenAtom
  );
  // eslint-disable-next-line no-unused-vars
  const [spotifyTokenResponse, setSpotifyTokenResponse] = useRecoilState(
    spotifyTokenResponseAtom
  );
  const signOutUser = useResetRecoilState(signOut);

  const authenticateUser = useCallback(
    async (code) => {
      setLoading(true);
      try {
        let response;
        if (spotifyRefreshToken) {
          response = await spotifyAuthCall({
            refresh_token: spotifyRefreshToken,
            grant_type: "refresh_token",
          });
        } else {
          response = await spotifyAuthCall({
            code,
            grant_type: "authorization_code",
          });
        }
        if (response.access_token) {
          setSpotifyRefreshToken(response.refresh_token);
          setSpotifyTokenResponse(response);
          setIsAuthenticated(true);
          history("/home");
        } else {
          signOutUser();
          alert("Your session has expired");
        }
      } catch (error) {
        setSpotifyTokenResponse(null);
        setSpotifyRefreshToken(null);
        setIsAuthenticated(false);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    },
    [setSpotifyRefreshToken, setSpotifyTokenResponse, setIsAuthenticated]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const spotifyCode = urlParams.get("code");
    if (spotifyCode || isAuthenticated) {
      authenticateUser(spotifyCode);
    }
  }, [location.search]);

  const handleLogin = () => {
    window.location.replace(spotifyUrl);
  };

  return (
    <div className="login-container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="login-card">
          <img src={logo} alt="logo" className="login-logo" />
          <h1>Welcome</h1>
          <h6>Sign up to find your favorite music.</h6>
          <button className="btn-signup" onClick={handleLogin}>
            Sign up
          </button>
        </div>
      )}
    </div>
  );
}
