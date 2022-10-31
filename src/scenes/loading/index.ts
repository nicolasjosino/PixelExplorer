import { GameObjects, Scene } from "phaser";
export class LoadingScene extends Scene {
  private dungeonMap!: string;
  constructor() {
    super("loading-scene");
  }
  create(): void {
    this.scene.start("level-1-scene");
    this.scene.start("ui-scene");
  }

  preload(): void {
    this.load.baseURL = "assets/";

    this.load.spritesheet("tiles_spr", "tilemaps/tiles/dungeon-16-16.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.dungeonMap = "dungeons-01";

    this.load.image("tiles", "tilemaps/tiles/dungeon-16-16.png");
    this.load.tilemapTiledJSON(
      "dungeon",
      `tilemaps/json/${this.dungeonMap}.tmj`
    );

    this.load.image("king", "sprites/king.png");
    this.load.image("king", "sprites/king.png");
    this.load.atlas("a-king", "spritesheets/a-king.png", "spritesheets/a-king_atlas.json");
  }
}