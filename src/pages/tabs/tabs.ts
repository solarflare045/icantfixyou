import { Component } from '@angular/core';

import { TerminalPage } from '../terminal/terminal';
import { CommunicationPage } from '../communication/communication';
import { ObjectivesPage } from '../objectives/objectives';
import { PersonalPage } from '../personal/personal';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TerminalPage;
  tab2Root: any = CommunicationPage;
  tab3Root: any = ObjectivesPage;
  tab4Root: any = PersonalPage;

  constructor() {

  }
}
