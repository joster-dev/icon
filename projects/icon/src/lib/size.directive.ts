import { Directive, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: 'size'
})
export class SizeDirective implements OnDestroy {
  @Input()
  get size() {
    return this._size;
  }
  set size(value: any) {
    if (value === null || value === undefined)
      value = '100%';
    if (typeof value === 'number' && value >= 0 && value <= 100)
      value = `${value}%`;
    if (typeof value !== 'string')
      throw new Error('size input must be: string');
    // todo: write regex
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/height
    this._size = value;
    this.sizeChangesSubject.next();
  }
  _size = '100%';
  sizeChangesSubject = new Subject<void>();

  ngOnDestroy(): void {
    this.sizeChangesSubject.complete();
  }
}
