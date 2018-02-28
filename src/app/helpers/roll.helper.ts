import { Injectable } from "@angular/core";

export class GameLevel  {
  constructor(public fps: number = 7, public rolls: number = 6, public nitro: number = 0) {}
}


@Injectable()
export class RollHelper {

  private static readonly SHORT_DISTANCE: number = 100;

  gameLevel: GameLevel = new GameLevel();
  rollNumber: number = 0;

  setGameLevel(gameLevel: GameLevel) {
    this.gameLevel = gameLevel;
  }

  roll(elements: HTMLElement[]): Promise<void> {
    const index1 = Math.floor(Math.random()*3);
    const index2 = (index1 + Math.floor(Math.random()*2) + 1) % 3;
    const elem1 = elements[index1];
    const elem2 = elements[index2];
    return (this.isShort(elem1, elem2) ?
      this.shortRoll(elem1, elem2) : this.bigRole(elem1, elem2))
      .then(() => {
        this.rollNumber++;
        if(this.rollNumber != this.gameLevel.rolls) {
          return this.roll(elements);
        } else {
          this.rollNumber = 0;
          return Promise.resolve();
        }
      });
  }

  private shortRoll(elem1: HTMLElement, elem2: HTMLElement): Promise<void> {
    return Promise.all([
      this.moveTo(elem1, RollHelper.SHORT_DISTANCE, this.inOrder(elem1, elem2)),
      this.moveTo(elem2, RollHelper.SHORT_DISTANCE, !this.inOrder(elem1, elem2))
    ]).then(() => Promise.resolve());
  }

  private bigRole(elem1: HTMLElement, elem2: HTMLElement): Promise<void> {
    return Promise.all([
      this.moveTo(elem1, RollHelper.SHORT_DISTANCE * 2, this.inOrder(elem1, elem2)),
      this.moveTo(elem2, RollHelper.SHORT_DISTANCE * 2, !this.inOrder(elem1, elem2))
    ]).then(() => Promise.resolve());
  }

  private inOrder(elem1: HTMLElement, elem2: HTMLElement): boolean {
    return elem1.offsetLeft < elem2.offsetLeft;
  }

  private isShort(elem1: HTMLElement, elem2: HTMLElement): boolean {
    return Math.abs(elem1.offsetLeft - elem2.offsetLeft) <= RollHelper.SHORT_DISTANCE;
  }

  private moveTo(elem: HTMLElement, _x: number, forward: boolean = true): Promise<void> {
    const startX = elem.offsetLeft;
    const startY = elem.offsetTop;
    const middle = startX + _x * (forward ? 1 : -1) / 2;
    const finishX = (startX + _x * (forward ? 1 : -1));
    const fast = _x !==  RollHelper.SHORT_DISTANCE;
    const speedX = (fast ? 4 : 2) + this.gameLevel.nitro;
    const speedY = (fast ? 3 : 1) + this.gameLevel.nitro;

    return new Promise<void>((resolve) => {
      const inter = setInterval(() => {
        const actualX = elem.offsetLeft;
        const actualY = elem.offsetTop;
        if (actualX <= (finishX + this.gameLevel.nitro) && actualX >= (finishX - this.gameLevel.nitro)) {
          elem.style.top = startY + 'px';
          elem.style.left = finishX + 'px';
          clearInterval(inter);
          resolve();
        } else {
          elem.style.top = ((middle > actualX) ? actualY + speedY : actualY - speedY) + 'px';
          elem.style.left = (actualX + speedX * (forward ? 1 : -1)) + 'px';
        }
      }, this.gameLevel.fps);
    });
  }

}