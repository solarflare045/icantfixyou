import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedProvider } from '../shared/shared';
import { Game } from '../../models/game.model';
import { User, GameObjectHelper } from '../../models/object.model';

@Injectable()
export class SessionProvider {
  public readonly myGame$: Observable<Game>;
  public readonly myObject$: Observable<User>;

  constructor(
    private sharedProvider: SharedProvider
  ) {
    this.myObject$ = GameObjectHelper.ref$(this.sharedProvider.root, this.sharedProvider.uid$)
      .map((obj) =>
        (obj instanceof User)
          ? <User>obj
          : null
      );

    this.myGame$ = this.myObject$.switchMap((user) => user && user.game$);
  }
}
