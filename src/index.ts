import { RandomLevel } from './scenes/levels/index';
import { Menu } from "./scenes/start/index";
import { UIScene } from "./scenes/ui/index";
import { Game, Types } from "phaser";
import { Level1 } from "./scenes";

const gameConfig: Types.Core.GameConfig = {
  title: "Phaser game tutorial",
  type: Phaser.WEBGL,
  parent: "game",
  backgroundColor: "#351f1b",
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    width: window.innerWidth,
    height: window.innerHeight,
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
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [Menu, Level1, UIScene, RandomLevel],
};

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight);
      window.game.canvas.setAttribute(
        "style",
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
      );
    }, 100);
  }
};
window.onresize = () => window.sizeChanged();

window.game = new Game(gameConfig);
