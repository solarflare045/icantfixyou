import { DeepLinkConfig } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { TerminalPage } from '../pages/terminal/terminal';
import { CommunicationPage } from '../pages/communication/communication';
import { ObjectivesPage } from '../pages/objectives/objectives';
import { PersonalPage } from '../pages/personal/personal';

import { LocationPage } from '../pages/location/location';

export const deepLinkConfig: DeepLinkConfig = {
  links: [
    { component: TabsPage,                name: 'Tabs',             segment: 'tabs'           },

    { component: LoginPage,               name: 'Login',            segment: 'login'          },

    { component: TerminalPage,            name: 'Terminal',         segment: 'terminal'       },
    // { component: TerminalDetailPage,      name: 'Terminal Detail',  segment: 'terminal/:oid'  , defaultHistory: [ TerminalPage ]},

    { component: CommunicationPage,       name: 'Communication',    segment: 'communication'  },
    { component: ObjectivesPage,          name: 'Objectives',       segment: 'objectives'     },
    { component: PersonalPage,            name: 'Personal',         segment: 'personal'       },
  ],
};

export const componentsConfig: any[] = [
  LoginPage,
  TabsPage,

  TerminalPage,
  CommunicationPage,
  ObjectivesPage,
  PersonalPage,
  
  LocationPage,
];
