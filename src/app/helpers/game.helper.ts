import { Injectable } from "@angular/core";
import { RollHelper, GameLevel } from "./roll.helper";

@Injectable()
export class GameHelper {

  public elements: HTMLElement[];
  public winner: HTMLElement;
  numberOfRolls: number = 5;
  ready: boolean = false;

  constructor(private rollHelper: RollHelper) {
  }

  init(e1: HTMLElement, e2: HTMLElement, e3: HTMLElement) {
    this.elements = [e1, e2, e3];
  }

  isReady(): boolean {
    return this.ready;
  }

  resetWinner()  {
    this.elements.forEach(e =>  {
      e.classList.remove('looser');
      e.classList.remove('winner');
    });
  }

  selectAndShowWinner() {
    const winnerIndex = Math.floor(Math.random()*3);
    this.winner = this.elements[winnerIndex];
    this.winner.classList.add('winner');
  }

  countdownAndRoll(callback: Function) {
    this.ready = false;
    setTimeout(() => {
      this.winner.classList.remove('winner');
      this.rollHelper.roll(this.elements)
        .then(() => { 
          this.ready = true; 
          callback();
        });
    }, 3000);
  }

  validateChoice(selected: HTMLElement): boolean {
    if (this.winner) {
      if (selected !== this.winner)  {
        selected.classList.add('looser');
      }
      this.winner.classList.add('winner');
      return selected === this.winner;
    }
    return false;
  }

  setLevel(gameLevel: GameLevel) {
    this.rollHelper.setGameLevel(gameLevel);
  }

}