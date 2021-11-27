import React, { useState } from "react";
import Logo from "../../assets/images/home-logo.png";
// atoms
import { spotifyTokenResponse } from "../../recoil/auth/atoms";
import { spotifyResults } from "../../recoil/songs/atoms";
// selectors
import { filterType as filterTypeSelector } from "../../recoil/songs/selectors";
import { signOut } from "../../recoil/auth/selectors";
//styles
import "./styles.css";
import "../login/styles.css";
import { useRecoilState, useResetRecoilState } from "recoil";
// utils
import { spotifySearchCall } from "../../utils";
// components
import HomeFilters from "../../components/HomeFilters/index.";
import Track from "../../components/Track";
import Artists from "../../components/Artists";
import Albums from "../../components/Albums";
import Spinner from "../../components/Spinner";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const [tokenResponse] = useRecoilState(spotifyTokenResponse);
  const [searchResults, setSearchResults] = useRecoilState(spotifyResults);
  const [filterType] = useRecoilState(filterTypeSelector);
  const resetFilter = useResetRecoilState(filterTypeSelector);
  const signOutUser = useResetRecoilState(signOut);

  const handleSearch = async () => {
    if (!searchText) return false;
    setLoading(true);
    let type = filterType ? `track,${filterType}` : "track";
    try {
      const paramsArray = [
        { q: searchText },
        { type },
        { offset: 50 },
        { limit: 12 },
      ];
      const response = await spotifySearchCall(
        paramsArray,
        tokenResponse.access_token
      );
      setSearchResults(response);
      setSearchText("");
    } catch (error) {
      if (error.status === 401) {
        signOutUser();
        alert("Your session has expired");
      }
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container home-container">
      <div className="header">
        <span onClick={signOutUser}> Log Out </span>
      </div>
      <div className="card-container">
        <img src={Logo} className="home-logo" alt="logo" />
        <div className="login-card">
          <h1>Search your favorite music</h1>
          <div className="search-container">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search for artists, songs, podcasts, or playlists"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <HomeFilters />
          {!!filterType && (
            <button className="reset-filters" onClick={resetFilter}>
              Reset filters
            </button>
          )}
        </div>
      </div>
      {searchResults && !loading && (
        <div className="results-container">
          {searchResults?.tracks?.items?.length > 0 && <h2>Tracks</h2>}
          <div className="list-container">
            {searchResults?.tracks?.items.map((item) => (
              <Track key={item.id} {...item} />
            ))}
          </div>
          {searchResults?.artists?.items?.length > 0 && <h2>Artists</h2>}
          <div className="list-container">
            {searchResults?.artists?.items.map((item) => (
              <Artists key={item.id} {...item} />
            ))}
          </div>
          {searchResults?.albums?.items?.length > 0 && <h2>Albums</h2>}
          <div className="list-container">
            {searchResults?.albums?.items.map((item) => (
              <Albums key={item.id} {...item} />
            ))}
          </div>
          {searchResults?.playlists?.items?.length > 0 && <h2>PlayLists</h2>}
          <div className="list-container">
            {searchResults?.playlists?.items.map((item) => (
              <Albums key={item.id} {...item} />
            ))}
          </div>
          {searchResults?.episodes?.items?.length > 0 && <h2>Episodes</h2>}
          <div className="list-container">
            {searchResults?.episodes?.items.map((item) => (
              <Albums key={item.id} {...item} />
            ))}
          </div>
        </div>
      )}
      {loading && <Spinner />}
    </div>
  );
}
