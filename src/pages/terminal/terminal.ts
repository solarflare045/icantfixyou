import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from 'ionic-angular';
import _ from 'lodash';

import { AngularFire } from 'angularfire2';
import { SessionProvider } from '../../providers/session/session';
import { SharedProvider } from '../../providers/shared/shared';

import { LocationPage } from '../location/location';

import { Game, GAME_HELPER } from '../../models/game.model';
import { Location } from '../../models/object.model';

@Component({
  selector: 'page-terminal',
  templateUrl: 'terminal.html'
})
export class TerminalPage {
  game$: Observable<Game>;
  locations$: Observable<Location[]>;

  constructor(public navCtrl: NavController, private sessionProvider: SessionProvider, private sharedProvider: SharedProvider, private af: AngularFire) {
    this.game$ = this.sessionProvider.myGame$;
    this.locations$ = this.game$.switchMap((game) => game.locations$);
  }

  select(location: Location) {
    this.sessionProvider.myObject$.first().subscribe((user) => user.setTarget(location.id));
    this.navCtrl.push(LocationPage, { location });
  }
}
