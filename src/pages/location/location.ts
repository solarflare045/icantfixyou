import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavParams } from 'ionic-angular';
import { Location } from '../../models/object.model';
import { Ailment } from '../../models/ailment.model';
import { SharedProvider } from '../../providers/shared/shared';
import { SessionProvider } from '../../providers/session/session';

@Component({
  templateUrl: 'location.html',
})
export class LocationPage {
  ailments$: Observable<Ailment[]>;
  location: Location;

  constructor(private params: NavParams, private sharedProvider: SharedProvider, private sessionProvider: SessionProvider) {
    this.location = this.params.get('location');
    this.ailments$ = this.location.ailments$;
  }
}
