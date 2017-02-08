import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs';

import { SessionProvider } from '../../providers/session/session';
import { SharedProvider } from '../../providers/shared/shared';

import { TabsPage } from '../../pages/tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  gameid: string;
  loggedIn$: Observable<boolean>;
  name: string;
  subscription: Subscription;

  constructor(
    private nav: NavController,
    private params: NavParams,
    private sessionProvider: SessionProvider,
    private sharedProvider: SharedProvider,
  ) {
    this.loggedIn$ = this.sharedProvider.auth$.map((state) => !!state);
  }

  ionViewDidEnter() {
    this.subscription = this.sessionProvider.myGame$
      .filter((game) => !!game)
      .do(() => this.nav.setRoot(TabsPage))
      .subscribe();
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  login() {
    this.sharedProvider.login();
  }

  connect() {
    this.sessionProvider.myObject$
      .first()
      .subscribe((object) => {
        object.setGame(this.gameid);
        object.setName(this.name);
      });
  }
}
