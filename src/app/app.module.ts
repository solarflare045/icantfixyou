import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule, FirebaseAppConfig, AuthProviders, AuthMethods } from 'angularfire2';

import { deepLinkConfig, componentsConfig } from './routes';

import { SessionProvider } from '../providers/session/session';
import { SharedProvider } from '../providers/shared/shared';

const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyBO2M1YoMd4GEqn68qq6lmQ2hC7UwdSyqI',
  authDomain: 'icantfixyou-e82f6.firebaseapp.com',
  databaseURL: 'https://icantfixyou-e82f6.firebaseio.com',
  storageBucket: 'icantfixyou-e82f6.appspot.com',
  messagingSenderId: '266599518181',
};

const firebaseAuth = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup,
};

@NgModule({
  declarations: [
    MyApp,
    ...componentsConfig,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {}, deepLinkConfig),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuth),
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    ...componentsConfig,
  ],
  providers: [
    SharedProvider,
    SessionProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
})
export class AppModule {}
