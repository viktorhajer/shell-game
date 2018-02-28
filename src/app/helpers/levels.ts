import { GameLevel } from "./roll.helper";

export class Levels {

  levelList: GameLevel[] = [
    // fps, rolls, nitro
    new GameLevel(10, 3, 0),
    new GameLevel(9, 5, 0),
    new GameLevel(7, 6, 0),
    new GameLevel(7, 10, 0),
    new GameLevel(8, 10, 1),

    new GameLevel(6, 5, 0),
    new GameLevel(6, 10, 0),
    new GameLevel(6, 12, 0),
    new GameLevel(6, 10, 1),
    new GameLevel(6, 12, 1),

    new GameLevel(5, 5, 0),
    new GameLevel(5, 5, 1),
    new GameLevel(5, 10, 1),
    new GameLevel(5, 12, 1),
    new GameLevel(5, 12, 1),

    new GameLevel(5, 5, 2),
    new GameLevel(5, 10, 2),
    new GameLevel(5, 12, 2), 
    new GameLevel(5, 15, 2),
    new GameLevel(5, 15, 2),

    new GameLevel(4, 5, 2),
    new GameLevel(4, 7, 2),
    new GameLevel(4, 12, 2),
    new GameLevel(4, 15, 2),
    new GameLevel(4, 20, 2)
  ];

  getLevel(index: number) {
    const normIndex = index % this.levelList.length
    return this.levelList[normIndex];
  }

}