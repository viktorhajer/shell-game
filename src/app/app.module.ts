import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { RollHelper } from './helpers/roll.helper';
import { GameHelper } from './helpers/game.helper';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [RollHelper, GameHelper],
  bootstrap: [GameComponent]
})
export class AppModule { }
