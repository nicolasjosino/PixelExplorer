import { Score } from "./../../classes/score";
import { Scene } from "phaser";

export class GameOver extends Scene {
  private finalScore!: Score;
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
      strokeThickness: 4,
      stroke: messageColor,
    });

    const finalScore = this.add.text(img.x / 2 + 22, (img.y / 1.5) + 5, `Score: ${this.finalScore}`);
    finalScore.setStyle({ fontSize: "12px"});

    const playAgain = this.add.text(img.x / 2 + 22, img.y / 1.2, "Play again");
    playAgain.setStyle({ fontSize: "12px" });
    playAgain.setInteractive();
    playAgain.on("pointerover", () => { playAgain.setStyle({ fill: "yellow"}) })
    playAgain.on("pointerout", () => { playAgain.setStyle({ fill: "white"}) })
    playAgain.on("pointerdown", () => { location.reload(); });
  }

  preload(): void {
    this.load.baseURL = "assets/tilemaps/";
    this.load.image("menu", "menu-screen.png");
  }
}
