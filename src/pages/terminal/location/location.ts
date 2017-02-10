import { Component, Input, AfterViewInit, state, style, transition, trigger, animate } from '@angular/core';
import { Observable } from 'rxjs';

import { Ailment } from '../../../models/ailment.model';
import { Location } from '../../../models/object.model';

@Component({
  templateUrl: 'location.html',
  selector: 'location',
  animations: [
    trigger('contentSlide', [
      state('void', style({
        transform: 'translate(400px, 0px)',
      })),
      transition('void <=> *', animate('400ms linear')),
    ])
  ],
})
export class LocationComponent implements AfterViewInit {
  @Input() location: Location;

  ailments$: Observable<Ailment[]>;

  ngAfterViewInit() {
    this.ailments$ = this.location.ailments$.startWith(null).share();
  }
}
