import * as music from "../../intents/music/music.js";
import MusicService from "../../background/musicService.js";

class YouTubeMusic extends MusicService {}

Object.assign(YouTubeMusic, {
  id: "youtubemusic",
  title: "YouTube Music",
  baseUrl: "https://music.youtube.com/",
});

music.register(YouTubeMusic);
