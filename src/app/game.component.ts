import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { GameHelper } from './helpers/game.helper';
import { GameLevel } from './helpers/roll.helper';
import { Levels } from './helpers/levels';

@Component({
  selector: 'app-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  static readonly WELCOME = 'Welcome!';
  static readonly WINNER = 'Winner!';
  static readonly LOOSER = 'Reached the level ';
  static readonly CHOOSE = 'Choose!';

  @ViewChild("box1", {read: ElementRef}) e1: ElementRef;
  @ViewChild("box2", {read: ElementRef}) e2: ElementRef;
  @ViewChild("box3", {read: ElementRef}) e3: ElementRef;

  message: string = GameComponent.WELCOME;
  isButtonDisabled: boolean = false;
  isNewGame: boolean = true;
  countdownMsg: string = '';
  level: number = 0;
  reachedLevel: number = 0;
  levels: Levels = new Levels();

  constructor(private gameHelper: GameHelper) {
  }

  ngOnInit()  {
    this.gameHelper.init(this.e1.nativeElement, this.e2.nativeElement, this.e3.nativeElement);
    this.gameHelper.setLevel(this.levels.getLevel(0));
  }

  roll(e1: HTMLElement, e2: HTMLElement, e3: HTMLElement) {
    if (!this.isButtonDisabled) {
      this.isButtonDisabled = true;
      this.message = '';
      this.gameHelper.resetWinner();
      this.showCountdownMsg();
      this.gameHelper.selectAndShowWinner();
      this.gameHelper.countdownAndRoll(this.readyToChoose.bind(this));
    }
  }

  choose(selected: HTMLElement) {
    if (this.gameHelper.isReady()) {
      if (this.gameHelper.validateChoice(selected)) {
        this.level++;
        this.reachedLevel = this.level;
        this.isNewGame = false;
        this.message = GameComponent.WINNER;
      } else {
        this.level = 0;
        this.message = GameComponent.LOOSER + this.reachedLevel;
        this.isNewGame = true;
      }
      this.gameHelper.setLevel(this.levels.getLevel(this.level));
    }
  }

  showCountdownMsg() {
    let counter = 3;
    this.countdownMsg = '3';
    let invter = setInterval(() => {
      counter--;
      if(counter === 0)  {
        clearInterval(invter);
        this.countdownMsg = '';
      } else {
        this.countdownMsg = counter + '';
      }
    }, 1000);
  }

  readyToChoose() {
    this.message = GameComponent.CHOOSE;
    this.isButtonDisabled = false;
  }
}
