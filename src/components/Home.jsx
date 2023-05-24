import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography } from "@material-ui/core";
import shuffleArray from "./helpers/shuffleArray";
import "./css/Home.css";

const API_BASE_URL = "https://jealous-gray-snaps.cyclic.app";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/songs`);
      const songsWithFilePath = response.data.songs.map((song) => ({
        ...song,
        file: `${API_BASE_URL}/${song.file}`,
        cover: `${API_BASE_URL}/${song.cover}`,
      }));

      const shuffledSongs = shuffleArray(songsWithFilePath);
      setSongs(shuffledSongs);
    } catch (error) {
      console.log(error);
    }
  };

  const searchSongs = async (query) => {
    try {
      let searchURL = `${API_BASE_URL}/search?`;
      switch (searchType) {
        case "name":
          searchURL += `name=${encodeURIComponent(query)}`;
          break;
        case "singer":
          searchURL += `singer=${encodeURIComponent(query)}`;
          break;
        case "category":
          searchURL += `category=${encodeURIComponent(query)}`;
          break;
        default:
          searchURL += `name=${encodeURIComponent(query)}`;
      }
      const response = await axios.get(searchURL);
      const songsWithFilePath = response.data.songs.map((song) => ({
        ...song,
        file: `${API_BASE_URL}/${song.file}`,
        cover: `${API_BASE_URL}/${song.cover}`,
      }));
      setSongs(songsWithFilePath);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchSongs(query);
  };

  return (
    <div className="container">
      <Typography variant="h3" gutterBottom>
        Music World
      </Typography>
      <div className="search-container">
        <TextField
          label="Search By"
          select
          variant="outlined"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="search-select"
        >
          <option value="name">Name</option>
          <option value="singer">Singer</option>
          <option value="category">Category</option>
        </TextField>
        <TextField
          label={`Search by ${searchType}`}
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className="search-input"
        />
        <Button variant="contained" color="primary" onClick={searchSongs}>
          Search
        </Button>
      </div>
      <div className="card-div">
        {songs.map((song, index) => (
          <div key={index} className="content">
            <div className="top-desc">
              <h3>{song.name}</h3>
            </div>

            <div className="album-pp">
              <div className="song-img">
                <img className="img-set" src={song.cover} alt="songcover" />
              </div>

              <div className="song-name">
                <h2 className="singer-name">{song.singer}</h2>
              </div>
            </div>

            <div className="album-desc">
              <audio src={song.file} controls></audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
