import { RandomLevel } from './scenes/levels/index';
import { Menu } from "./scenes/start/index";
import { UIScene } from "./scenes/ui/index";
import { Game, Types } from "phaser";
import { Level1 } from "./scenes";
import { GameOver } from './scenes';

const gameConfig: Types.Core.GameConfig = {
  title: "Phaser game tutorial",
  type: Phaser.WEBGL,
  parent: "game",
  backgroundColor: "#351f1b",
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    width: 600,
    height: 400,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  callbacks: {},
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [Menu, Level1, UIScene, RandomLevel, GameOver],
};

const game = new Game(gameConfig);
