import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SizeDirective } from '../size.directive';

@Component({
  selector: 'icon-stack',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./icon-stack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': 'size()',
    '[style.height]': 'size()'
  }
})
export class IconStackComponent extends SizeDirective { }
