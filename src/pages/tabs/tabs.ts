import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TerminalPage } from '../terminal/terminal';
import { CommunicationPage } from '../communication/communication';
import { ObjectivesPage } from '../objectives/objectives';
import { PersonalPage } from '../personal/personal';

import { SessionProvider } from '../../providers/session/session';
import { Game } from '../../models/models';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TerminalPage;
  tab2Root: any = CommunicationPage;
  tab3Root: any = ObjectivesPage;
  tab4Root: any = PersonalPage;

  tabParams$: Observable<{ game: Game }>;
  tab1Badge$: Observable<string>;

  constructor(private sessionProvider: SessionProvider) {
    this.tab1Badge$ = this.sessionProvider.myTarget$
      .switchMap((target) => target ? target.name$ : Observable.of(null));
  }
}
