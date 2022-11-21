import { Score } from './../../classes/score';
import { Scene } from "phaser";

export class GameOver extends Scene {
    private finalScore!: Score; 
  constructor() {
    super("end-scene");
  }

  create(): void {
    this.finalScore = this.scene.get('ui-scene').data.get('score');
    const img = this.add.image(144, 144, "menu");

    const message = this.add.text(98, img.y/2, "You won!");
    message.setStyle({ fontSize: "20px" });

    const finalScore = this.add.text(78, img.y/1.5, `Final score: ${this.finalScore}`);
    finalScore.setStyle({ fontSize: "15px" });
  }

  preload(): void {
    this.load.baseURL = "assets/tilemaps/";
    this.load.image("menu", "menu-screen.png");
    console.log("end game scene loaded");
  }
}
