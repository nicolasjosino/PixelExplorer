import { Scene } from "phaser";
import { Text } from "./../../classes/text";
export class Menu extends Scene {
  private title!: Text;
  constructor() {
    super("menu-scene");
  }

  create(): void {
    this.add.image(144, 144, "menu");
    this.title = this.add.text(50, 60, "Pixel Explorer");
    this.title.setStyle({ fontSize: "calc(100vw / 20)",});
    const playBtt = this.add.text(120, 90, "Play");
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
