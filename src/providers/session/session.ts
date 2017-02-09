import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedProvider } from '../shared/shared';
import { Game } from '../../models/game.model';
import { User, GameObject, OBJECT_HELPER } from '../../models/object.model';

@Injectable()
export class SessionProvider {
  public readonly myGame$: Observable<Game>;
  public readonly myObject$: Observable<User>;
  public readonly myTarget$: Observable<GameObject>;

  constructor(
    private sharedProvider: SharedProvider
  ) {
    this.myObject$ = OBJECT_HELPER.ref$(this.sharedProvider.root, this.sharedProvider.uid$)
      .map((obj) =>
        (obj instanceof User)
          ? <User>obj
          : null
      );

    this.myGame$ = this.myObject$
      .switchMap((user) => this.iif(user, () => user.game$));

    this.myTarget$ = this.myObject$
      .switchMap((user) => this.iif(user, () => user.target$));
  }

  private iif<F, T>(object: F, run: () => Observable<T>): Observable<T> {
    return object
      ? run()
      : Observable.of(null);
  }
}
