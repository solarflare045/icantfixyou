import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from 'ionic-angular';

import { AngularFire } from 'angularfire2';
import { SessionProvider } from '../../providers/session/session';
import { SharedProvider } from '../../providers/shared/shared';
import { Game, GameHelper } from '../../models/game.model';

@Component({
  selector: 'page-terminal',
  templateUrl: 'terminal.html'
})
export class TerminalPage {
  game: Game;

  constructor(public navCtrl: NavController, private sessionProvider: SessionProvider, private sharedProvider: SharedProvider, private af: AngularFire) {
    this.sessionProvider.myGame$
      .switchMap((game) => game.objects$)
      .subscribe((objects) => console.log(objects));
  }
}
