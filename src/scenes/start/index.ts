import { Scene } from "phaser";
export class Menu extends Scene {
  constructor() {
    super("menu-scene");
  }

  create(): void {
    const img = this.add.image(144, 144, "menu");

    const title = this.add.text((img.x/2)-12, (img.y/2.4), "Pixel Explorer");
    title.setStyle({ fontSize: "20px", stroke: "black", strokeThickness: 3 });

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
    howToBtt.on("pointerdown", () => { this.scene.start("how-to-scene") });

    const madeBy = this.add.text(img.x/1.30, img.y+80, "GitHub");
    madeBy.setFontSize(15);
    madeBy.setInteractive();
    madeBy.on("pointerover", () => { madeBy.setStyle({ fill: "yellow"}) })
    madeBy.on("pointerout", () => { madeBy.setStyle({ fill: "white"}) })
    madeBy.on("pointerdown", () => { window.open("https://github.com/nicolasjosino/PixelExplorer/")})
  }

  preload(): void {
    this.load.baseURL = "assets/tilemaps/";
    this.load.image("menu", "menu-screen.png");
  }
}
