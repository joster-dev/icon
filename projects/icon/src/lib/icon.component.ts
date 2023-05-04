import { Component, Input } from '@angular/core';
import { icon } from './icon.type';
import { iconTypes } from './icon-types.const';
import { SizeDirective } from './size.directive';

@Component({
  selector: 'icon[type]',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent extends SizeDirective {
  @Input()
  get type() {
    return this._type;
  }
  set type(value: icon) {
    if (typeof value === 'string')
      value = value.toLowerCase().trim() as icon;
    if (!iconTypes.includes(value))
      throw new Error(`expected [type] to be: ${iconTypes.join(' | ')}`);
    this._type = value;
  }
  _type!: icon;

  @Input()
  get fill() {
    return this._fill;
  }
  set fill(value: string | null | (string | null)[]) {
    if (typeof value === 'string')
      value = [value];
    if (value === null || value === undefined)
      value = [null];
    if (!Array.isArray(value) || !value.every(item => item === null || typeof item === 'string'))
      throw new Error('expected [fill] to be: string | null | (string | null)[]');
    this._fill = value;
  }
  _fill: (string | null)[] = [null];

  @Input()
  get fillRotate() {
    return this._fillRotate;
  }
  set fillRotate(value: string | number) {
    if (typeof value === 'number')
      value = String(value);
    if (typeof value !== 'string')
      throw new Error('expected [fillRotate] to be: string | number');
    this._fillRotate = value;
  }
  _fillRotate = '0';

  @Input()
  get fillOpacity() {
    return this._fillOpacity;
  }
  set fillOpacity(value: number) {
    if (typeof value !== 'number' || value < 0)
      throw new Error('expected [fillOpacity] to be: number >= 0');
    this._fillOpacity = value;
  }
  _fillOpacity = 1;

  @Input()
  get stroke() {
    return this._stroke;
  }
  set stroke(value: string | null | (string | null)[]) {
    if (typeof value === 'string')
      value = [value];
    if (value === null || value === undefined)
      value = [null];
    if (!Array.isArray(value) || !value.every(item => item === null || typeof item === 'string'))
      throw new Error('expected [stroke] to be: string | null | (string | null)[]');
    this._stroke = value;
  }
  _stroke: (string | null)[] = ['current'];

  @Input()
  get strokeRotate() {
    return this._strokeRotate;
  }
  set strokeRotate(value: string | number) {
    if (typeof value === 'number')
      value = String(value);
    if (typeof value !== 'string')
      throw new Error('expected [strokeRotate] to be: string | number');
    this._strokeRotate = value;
  }
  _strokeRotate = '0';

  @Input()
  get rotate() {
    return this._rotate;
  }
  set rotate(value: string | number) {
    if (typeof value === 'number')
      value = String(value);
    if (typeof value !== 'string')
      throw new Error('expected [rotate] to be: string | number');
    this._rotate = value;
  }
  _rotate = '0'

  @Input()
  spin: 'x' | 'y' | 'z' | null = null;

  id = `${Math.random().toString(36).substring(2, 13)}`;

  constructor() {
    super();
  }

  linearGradientStopColor(item: string | null) {
    if (item === 'current')
      return 'currentColor';

    return item === null
      ? ''
      : `#${item}`;
  }

  linearGradientStopOpacity(item: string | null) {
    return item === null
      ? 0
      : 1;
  }

  linearGradientStopOffset(index: number, items: unknown[]) {
    if (items.length === 1)
      return '0%';
    return `${100 - (((items.length - 1 - index) / (items.length - 1)) * 100)}%`;
  }
}
