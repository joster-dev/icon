import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { SizeDirective } from '../size.directive';

@Component({
    selector: 'icon-stack',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./icon-stack.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class IconStackComponent extends SizeDirective {
  @HostBinding('style.width') width = this.size;
  @HostBinding('style.height') height = this.size;

  constructor() {
    super();
    this.sizeChangesSubject.subscribe({
      next: () => {
        this.width = this.size;
        this.height = this.size;
      }
    });
  }
}
