import { Score } from "./../../classes/score";
import { Scene } from "phaser";

export class GameOver extends Scene {
  private finalScore!: Score;
  private victory!: boolean;
  constructor() {
    super("end-scene");
  }

  create(): void {
    this.finalScore = this.scene.get("ui-scene").data.get("score");
    const endGameMessage = this.data.get("victory") ? "YOU WON!" : "YOU DIED!";
    const messageColor = this.data.get("victory") ? "Green" : "Red";

    const img = this.add.image(144, 144, "menu");

    const message = this.add.text(img.x / 2 + 18, img.y / 2, endGameMessage);
    message.setStyle({
      fontSize: "20px",
      stroke: "black",
      strokeThickness: 5,
      fill: messageColor,
    });

    const finalScore = this.add.text(img.x / 2 + 35, (img.y / 1.5) + 5, `Score: ${this.finalScore}`);
    finalScore.setStyle({ fontSize: "15px" });

    const playAgain = this.add.text(img.x / 2 + 25, img.y / 1.2, "Play again");
    playAgain.setStyle({ fontSize: "15px" });
    playAgain.setInteractive().on("pointerdown", () => {
      this.restartGame();
    });
  }

  preload(): void {
    this.load.baseURL = "assets/tilemaps/";
    this.load.image("menu", "menu-screen.png");
  }

  private restartGame(): void {
    // this.game.scene.remove("end-scene");
    // this.game.scene.remove("menu-scene");
    // this.game.scene.bringToTop("menu-scene");
  }
}
