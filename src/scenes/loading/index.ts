import { GameObjects, Scene } from "phaser";
export class LoadingScene extends Scene {
  private dungeonMap!: string;
  constructor() {
    super("loading-scene");
  }
  create(): void {
    console.log("loading scene loaded");
    this.scene.start("menu-scene");
    // this.scene.start("level-1-scene");
    // this.scene.start("ui-scene");
  }

  preload(): void {
    this.load.baseURL = "assets/";
    // this.load.image("menu-screen", "tilemaps/menu-screen.png");

    this.load.spritesheet("tiles_spr", "tilemaps/tiles/dungeon-16-16.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }
}
