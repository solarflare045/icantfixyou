import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from 'ionic-angular';

import { SharedProvider } from '../../providers/shared/shared';
import { Game } from '../../models/game.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  game: Game;

  constructor(public navCtrl: NavController, private sharedProvider: SharedProvider) {
    this.game = new Game( this.sharedProvider.root.child('games').child('abcabc') );

    this.game.objects$.subscribe((objects) => console.log(objects));
  }
}
