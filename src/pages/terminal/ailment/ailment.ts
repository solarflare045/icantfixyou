import { Component, Input } from '@angular/core';

import { Ailment } from '../../../models/ailment.model';

@Component({
  selector: 'ailment',
  templateUrl: 'ailment.html',
})
export class AilmentComponent {
  @Input() ailment: Ailment;
}
