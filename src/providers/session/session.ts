import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import _ from 'lodash';

import { SharedProvider } from '../shared/shared';
import { Game } from '../../models/game.model';
import { User, GameObject, OBJECT_HELPER } from '../../models/object.model';

@Injectable()
export class SessionProvider {
  public readonly myGame$: Observable<Game>;
  public readonly myObject$: Observable<User>;
  public readonly mySecret$: Observable<string>;
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

    this.myGame$ = this.myObject$.switchMap((user) => this.iif(user, () => user.game$));
    this.myTarget$ = this.myObject$.switchMap((user) => this.iif(user, () => user.target$));

    this.mySecret$ = this.myObject$
      .switchMap((user) =>
        !user
          ? Observable.of(null)
          : user.secret$.switchMap(
            (secret) =>
              secret
                ? Observable.of(secret)
                : Observable.defer(() => {
                  let newSecret = this.generateSecret();
                  return Observable.fromPromise( <Promise<void>>user.setSecret(newSecret) ).mapTo(newSecret);
                })
          )
      );
  }

  private generateSecret(): string {
    return _.times(128, () => _.sample('0123456789abcdefghijklmnopqrstuvwxyz')).join('');
  } 

  private iif<F, T>(object: F, run: () => Observable<T>): Observable<T> {
    return object
      ? run()
      : Observable.of(null);
  }
}
