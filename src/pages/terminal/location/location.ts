import { Component, Input } from '@angular/core';

import { Location } from '../../../models/object.model';

@Component({
  templateUrl: 'location.html',
  selector: 'location',
})
export class LocationComponent {
  @Input() location: Location;
}
