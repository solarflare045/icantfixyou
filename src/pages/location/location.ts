import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavParams } from 'ionic-angular';
import { Location } from '../../models/object.model';
import { SharedProvider } from '../../providers/shared/shared';

@Component({
  templateUrl: 'location.html',
})
export class LocationPage {
  location: Location;

  constructor(private params: NavParams, private sharedProvider: SharedProvider) {
    this.location = this.params.get('location');
  }
}
