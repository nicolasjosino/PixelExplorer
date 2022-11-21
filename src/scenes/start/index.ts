import { Scene } from "phaser";
export class Menu extends Scene {
  constructor() {
    super("menu-scene");
  }

  create(): void {
    const img = this.add.image(144, 144, "menu");

    const title = this.add.text(60, img.y/2, "Pixel Explorer");
    title.setInteractive();
    title.setStyle({ fontSize: "20px" });

    const playBtt = this.add.text(120, img.y/1.5, "Play");
    playBtt.setInteractive();
    playBtt.on("pointerover", () => { playBtt.setStyle({ fill: "yellow"}) })
    playBtt.on("pointerout", () => { playBtt.setStyle({ fill: "white"}) })
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
