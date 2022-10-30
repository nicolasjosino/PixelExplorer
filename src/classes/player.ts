import { Actor } from "./actor";
export class Player extends Actor {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private cursors: any;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "king");
    // KEYS
    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    // PHYSICS
    this.getBody().setSize(30, 30);
    this.getBody().setOffset(8, 0);

    this.initAnimations();
  }
  private initAnimations(): void {
    this.scene.anims.create({
      key: "run",
      frames: this.scene.anims.generateFrameNames("a-king", {
        prefix: "run-",
        end: 7,
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "attack",
      frames: this.scene.anims.generateFrameNames("a-king", {
        prefix: "attack-",
        end: 2,
      }),
      frameRate: 8,
    });
  }
  update(): void {
    this.getBody().setVelocity(0);
    if (this.keyW?.isDown || this.cursors.up.isDown) {
      this.body.velocity.y = -110;
      !this.anims.isPlaying && this.anims.play("run", true);
    }
    if (this.keyA?.isDown || this.cursors.left.isDown) {
      this.body.velocity.x = -110;
      this.checkFlip();
      this.getBody().setOffset(48, 15);
      !this.anims.isPlaying && this.anims.play("run", true);
    }
    if (this.keyS?.isDown || this.cursors.down.isDown) {
      this.body.velocity.y = 110;
      !this.anims.isPlaying && this.anims.play("run", true);
    }
    if (this.keyD?.isDown || this.cursors.right.isDown) {
      this.body.velocity.x = 110;
      this.checkFlip();
      this.getBody().setOffset(15, 15);
      !this.anims.isPlaying && this.anims.play("run", true);
    }
  }
}
