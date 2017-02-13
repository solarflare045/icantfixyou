import { Component, animate, state, style, transition, trigger } from '@angular/core';
import { Observable } from 'rxjs';

import { LocationComponent } from './location/location';

import { Game, Location, GameObject, User } from '../../models/models';

@Component({
  selector: 'page-terminal',
  templateUrl: 'terminal.html',
  providers: [ LocationComponent ],
  animations: [
    trigger('disconnectButton', [
      state('void', style({
        transform: 'translate(400px, 0px)',
      })),
      transition('void <=> *', animate('400ms linear')),
    ])
  ]
})
export class TerminalPage {
  connected$: Observable<boolean>;
  location$: Observable<Location>;
  locations$: Observable<Location[]>;
  target$: Observable<GameObject>;

  constructor(private game: Game, private user: User) {
    this.locations$ = this.game.locations$;
    this.target$ = this.user.target$;
    this.connected$ = this.target$.map((target) => !!target);
    this.location$ = this.target$.map((target) => (target instanceof Location) ? <Location>target : null);
  }

  select(location: Location) {
    this.user.setTarget(location.id);
  }

  disconnect() {
    this.user.setTarget(null);
  }
}
