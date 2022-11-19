import { Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";
import { gameObjectsToObjectPoints } from "../../helpers/gameobject-to-object-point";
import { EVENTS_NAME } from "../../consts";
import { Enemy } from "../../classes/enemy";
import { levelData } from "../../classes/levelData";

export class RandomLevel extends Scene {
  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.TilemapLayer;
  private groundLayer!: Tilemaps.TilemapLayer;
  private stairsLayer!: Tilemaps.TilemapLayer;
  private chests!: Phaser.GameObjects.Sprite[];
  private enemies!: Phaser.GameObjects.Sprite[];
  private lvlData!: levelData;
  private lvlNumber!: string;

  constructor() {
    super("level-scene");
  }

  create(): void {
    console.log("random level scene loaded");
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
    console.log("preload random");
    this.checkLvlData();
    this.load.baseURL = "assets/";

    this.load.spritesheet("tiles_spr", "tilemaps/tiles/dungeon-16-16.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.image("tiles", "tilemaps/tiles/dungeon-16-16.png");
    this.load.tilemapTiledJSON(`dungeon${this.lvlNumber}`, `tilemaps/json/dg${this.lvlNumber}.tmj`);

    this.load.image("king", "sprites/king.png");
    this.load.image("king", "sprites/king.png");
    this.load.atlas(
      "a-king",
      "spritesheets/a-king.png",
      "spritesheets/a-king_atlas.json"
    );
    console.log("finish preload");
  }

  update() {
    this.player.update();
  }

  private checkLvlData(): void {
    if (this.lvlData == undefined) {
      this.lvlData = new levelData();
    }
    
    if (this.lvlData.count == 5) {
      console.log("GAME OVER");
      this.scene.pause("level-scene");
    } else {
      var randNumber = Math.floor((Math.random() * this.lvlData.levels.length));
      this.lvlNumber = this.lvlData.levels.splice(randNumber, 1)[0];
    }
    this.lvlData.count++;
  }

  private initMap(): void {
    this.map = this.make.tilemap({
      key: `dungeon${this.lvlNumber}`,
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
    // console.log(this.scene.settings.data);

    this.scene.restart(this.lvlData);
    console.log("teste");
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
  }
}
