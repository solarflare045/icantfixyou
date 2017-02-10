import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { TerminalPage } from '../terminal/terminal';
import { CommunicationPage } from '../communication/communication';
import { ObjectivesPage } from '../objectives/objectives';
import { PersonalPage } from '../personal/personal';

import { SharedNode, SharedProvider } from '../../providers/shared/shared';
import { Game, User } from '../../models/models';
import { GAME_HELPER } from '../../models/game.model';
import { USER_HELPER } from '../../models/object.model';

@Component({
  templateUrl: 'tabs.html',
  providers: [
    { provide: Game, useFactory: ((tabs) => tabs.game), deps: [ TabsPage ] },
    { provide: User, useFactory: ((tabs) => tabs.user), deps: [ TabsPage ] },
    { provide: SharedNode, useFactory: ((tabs) => tabs.rootNode), deps: [ TabsPage ] },
  ],
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TerminalPage;
  tab2Root: any = CommunicationPage;
  tab3Root: any = ObjectivesPage;
  tab4Root: any = PersonalPage;

  tabParams: { gid: string, uid: string } = null;
  tab1Badge$: Observable<string>;
  tab1BadgeStyle$: Observable<string>;

  readonly rootNode: SharedNode;
  readonly game: Game;
  readonly user: User;

  constructor(private nav: NavParams, private sharedProvider: SharedProvider) {
    this.tabParams = this.nav.data;
    this.rootNode = this.sharedProvider.root;
    this.game = GAME_HELPER.ref(this.sharedProvider.root, this.nav.get('gid'));
    this.user = USER_HELPER.ref(this.sharedProvider.root, this.nav.get('uid'));

    this.tab1Badge$ = this.user.target$.switchMap((target) => target ? target.name$ : Observable.of(null));
    this.tab1BadgeStyle$ = this.user.target$.switchMap((target) => target ? target.health$ : Observable.of(null));
  }
}
