import { DeepLinkConfig } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { TerminalPage } from '../pages/terminal/terminal';
import { CommunicationPage } from '../pages/communication/communication';
import { ObjectivesPage } from '../pages/objectives/objectives';
import { PersonalPage } from '../pages/personal/personal';

export const deepLinkConfig: DeepLinkConfig = {
  links: [
    /* { component: TabsPage,                name: 'Tabs',           segment: 'tabs'                 }, */

    { component: LoginPage,               name: 'Login',          segment: 'login'    },

    { component: TerminalPage,            name: 'Terminal',       segment: ''         },
    { component: CommunicationPage,       name: 'Communication',  segment: ''         },
    { component: ObjectivesPage,          name: 'Objectves',      segment: ''         },
    { component: PersonalPage,            name: 'Personal',       segment: ''         },
  ],
};

export const componentsConfig: any[] = [
  LoginPage,
  TabsPage,

  TerminalPage,
  CommunicationPage,
  ObjectivesPage,
  PersonalPage,
];
