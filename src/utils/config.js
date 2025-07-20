const config = {
  defaultTimer: 180,
  stageLevels: [
    {
      title: "mudah",
      totalCard: 8,
    },
    {
      title: "sedang",
      totalCard: 12,
    },
    {
      title: "sulit",
      totalCard: 18,
    },
  ],
  musicSounds: [
    {
      title: "gameplay",
      src: "./music/game-play.mp3",
    },
    {
      title: "gameover",
      src: "./music/game-over.mp3",
    },
    {
      title: "button_click",
      src: "./music/button-click.mp3",
    },
  ],
};

export const { defaultTimer, stageLevels, musicSounds } = config;
