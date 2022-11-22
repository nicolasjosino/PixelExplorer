import { Scene } from "phaser";
export class Menu extends Scene {
  constructor() {
    super("menu-scene");
  }

  create(): void {
    const img = this.add.image(144, 144, "menu");

    const title = this.add.text((img.x/2) - 13, (img.y/2), "Pixel Explorer");
    title.setStyle({ fontSize: "20px" });

    const playBtt = this.add.text(120, img.y/1.5, "Play");
    playBtt.setInteractive();
    playBtt.on("pointerover", () => { playBtt.setStyle({ fill: "yellow"}) })
    playBtt.on("pointerout", () => { playBtt.setStyle({ fill: "white"}) })
    playBtt.on("pointerdown", () => {
      this.scene.start("level1-scene");
      this.scene.start("ui-scene");
    });

    const howToBtt = this.add.text(90, img.y/1.25, "How to play");
    howToBtt.setInteractive();
    howToBtt.on("pointerover", () => { howToBtt.setStyle({ fill: "yellow"}) })
    howToBtt.on("pointerout", () => { howToBtt.setStyle({ fill: "white"}) })
    howToBtt.on("pointerdown", () => {
      this.scene.start("how-to-scene"); 
    });
  }

  preload(): void {
    this.load.baseURL = "assets/tilemaps/";
    this.load.image("menu", "menu-screen.png");
  }
}
