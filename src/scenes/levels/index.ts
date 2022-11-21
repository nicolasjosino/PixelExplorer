import { Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";
import { gameObjectsToObjectPoints } from "../../helpers/gameobject-to-object-point";
import { EVENTS_NAME } from "../../consts";
import { Enemy } from "../../classes/enemy";
import { LevelData } from "../../classes/levelData";

export class RandomLevel extends Scene {
  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.TilemapLayer;
  private groundLayer!: Tilemaps.TilemapLayer;
  private stairsLayer!: Tilemaps.TilemapLayer;
  private chests!: Phaser.GameObjects.Sprite[];
  private enemies!: Phaser.GameObjects.Sprite[];
  private levelData!: LevelData;
  private levelNumber!: string;

  constructor() {
    super("level-scene");
  }

  create(): void {
    console.log("random level scene loaded");
    console.log("level " + this.levelData.count);

    this.initMap();
    this.player = new Player(this, 25, 100);
    this.initChests();
    this.initEnemies();
    this.physics.add.collider(this.player, this.wallsLayer);
    this.physics.add.collider(this.player, this.stairsLayer, () => {
      this.reachStairs();
    });
  }

  preload() {
    this.checkLevelData();
    this.load.baseURL = "assets/";

    this.load.spritesheet("tiles_spr", "tilemaps/tiles/dungeon-16-16.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.image("tiles", "tilemaps/tiles/dungeon-16-16.png");
    this.load.tilemapTiledJSON(
      `dungeon${this.levelNumber}`,
      `tilemaps/json/dg${this.levelNumber}.tmj`
    );

    this.load.image("king", "sprites/king.png");
    this.load.image("king", "sprites/king.png");
    this.load.atlas(
      "a-king",
      "spritesheets/a-king.png",
      "spritesheets/a-king_atlas.json"
    );
  }

  update() {
    this.player.update();
  }

  private checkLevelData(): void {
    if (this.levelData == undefined) {
      this.levelData = new LevelData();
    }
    var randNumber = Math.floor(Math.random() * this.levelData.levels.length);
    this.levelNumber = this.levelData.levels.splice(randNumber, 1)[0];
    this.levelData.count++;
  }

  private initMap(): void {
    this.map = this.make.tilemap({
      key: `dungeon${this.levelNumber}`,
      tileWidth: 16,
      tileHeight: 16,
    });
    this.tileset = this.map.addTilesetImage("dungeon", "tiles");
    this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);

    this.stairsLayer = this.map.createLayer("Stairs", this.tileset, 0, 0);
    this.stairsLayer.setCollisionByProperty({ collides: true });

    this.wallsLayer = this.map.createLayer("Walls", this.tileset, 0, 0);
    this.wallsLayer.setCollisionByProperty({ collides: true });
    this.physics.world.setBounds(
      0,
      0,
      this.wallsLayer.width,
      this.wallsLayer.height
    );
  }

  private initChests(): void {
    const chestPoints = gameObjectsToObjectPoints(
      this.map.filterObjects("Chests", (obj) => obj.name === "ChestPoint")
    );
    this.chests = chestPoints.map((chestPoint) =>
      this.physics.add
        .sprite(chestPoint.x, chestPoint.y, "tiles_spr", 595)
        .setScale(1.5)
    );
    this.chests.forEach((chest) => {
      this.physics.add.overlap(this.player, chest, (obj1, obj2) => {
        this.game.events.emit(EVENTS_NAME.chestLoot);
        obj2.destroy();
      });
    });
  }

  private initEnemies(): void {
    const enemiesPoints = gameObjectsToObjectPoints(
      this.map.filterObjects("Enemies", (obj) => obj.name === "EnemyPoint")
    );
    this.enemies = enemiesPoints.map((enemyPoint) =>
      new Enemy(this, enemyPoint.x, enemyPoint.y, "tiles_spr", this.player, 375)
        .setName(enemyPoint.id.toString())
        .setScale(1.5)
    );
    this.physics.add.collider(this.enemies, this.wallsLayer);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.enemies, (obj1, obj2) => {
      (obj1 as Player).getDamage(1);
    });
  }

  private reachStairs() {
    if (this.levelData.count == 5) {
      console.log("GAME OVER");
      this.game.scene.remove("level-scene");
      this.game.scene.start("end-scene");
      // this.game.scene.bringToTop("end-scene");
      this.game.scene.remove("ui-scene");
    } else {
    this.scene.restart(this.levelData);
    }
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
  }
}
