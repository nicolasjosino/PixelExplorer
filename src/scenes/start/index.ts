import { Text } from "./../../classes/text";
import { Scene } from "phaser";
import { EventEmitter } from "stream";
import { on } from "events";
export class Menu extends Scene {
  private text!: Text;
  constructor() {
    super("menu-scene");
  }

  create(): void {
    this.add.image(250, 250, "menu");
    this.text = this.add.text(185, 150, "Pixel Explorer");
    const playBtt = this.add.text(230, 170, "Play");
    playBtt.setInteractive();
    playBtt.on("pointerdown", () => {
      this.scene.start("level-1-scene");
      this.scene.start("ui-scene");
    });
  }

  preload(): void {
    this.load.baseURL = "assets/tilemaps/";
    this.load.image("menu", "menu-screen.png");
    console.log("menu scene loaded");
  }
}
