import { Component, Input, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Ailment } from '../../../models/ailment.model';
import { Location } from '../../../models/object.model';

@Component({
  templateUrl: 'location.html',
  selector: 'location',
})
export class LocationComponent implements AfterViewInit {
  @Input() location: Location;

  ailments$: Observable<Ailment[]>;

  ngAfterViewInit() {
    this.ailments$ = this.location.ailments$.startWith(null).share();
  }
}
