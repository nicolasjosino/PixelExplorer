import { Scene } from "phaser";
import { Score, ScoreOperations } from "../../classes/score";
import { EVENTS_NAME } from "../../consts";

export class UIScene extends Scene {
  private score!: Score;
  private chestLootHandler: () => void;
  private enemyKillHandler: () => void;

  constructor() {
    super("ui-scene");
    this.chestLootHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 10);
    };
    this.enemyKillHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 20);
    }
  }

  create(): void {
    this.score = new Score(this, 20, 20, 0);
    this.score.setStyle({ fontSize: "12px" });
    this.initListeners();
  }

  update(): void {
    this.data.set('score', this.score.scoreValue)
  }

  private initListeners(): void {
    this.game.events.on(EVENTS_NAME.chestLoot, this.chestLootHandler, this);
    this.game.events.on(EVENTS_NAME.kill, this.enemyKillHandler, this);
  }
}
