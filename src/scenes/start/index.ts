import { Scene } from "phaser";
import { Text } from "./../../classes/text";
export class Menu extends Scene {
  private title!: Text;
  private play!: Text;
  constructor() {
    super("menu-scene");
  }

  create(): void {
    var img = this.add.image(144, 144, "menu");
    this.title = this.add.text(60, img.y/2, "Pixel Explorer");
    this.title.setInteractive();
    this.title.setStyle({ fontSize: "20px" });
    const playBtt = this.add.text(120, img.y/1.5, "Play");
    playBtt.setInteractive();
    playBtt.on("pointerdown", () => {
      this.scene.start("level1-scene");
      this.scene.start("ui-scene");
    });
  }

  preload(): void {
    this.load.baseURL = "assets/tilemaps/";
    this.load.image("menu", "menu-screen.png");
    console.log("menu scene loaded");
  }
}
