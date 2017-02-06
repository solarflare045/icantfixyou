import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { SharedProvider } from '../providers/shared/shared';

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyBO2M1YoMd4GEqn68qq6lmQ2hC7UwdSyqI',
  authDomain: 'icantfixyou-e82f6.firebaseapp.com',
  databaseURL: 'https://icantfixyou-e82f6.firebaseio.com',
  storageBucket: 'icantfixyou-e82f6.appspot.com',
  messagingSenderId: '266599518181'
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    SharedProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
