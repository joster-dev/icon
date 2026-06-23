import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { icon } from './icon.type';
import { iconTypes } from './icon-types.const';
import { SizeDirective } from './size.directive';

function coerceType(value: string | icon): icon {
  const coerced = (typeof value === 'string' ? value.toLowerCase().trim() : value) as icon;
  if (!iconTypes.includes(coerced))
    throw new Error(`expected [type] to be: ${iconTypes.join(' | ')}`);
  return coerced;
}

function coerceColors(name: string) {
  return (value: string | null | (string | null)[]): (string | null)[] => {
    if (typeof value === 'string')
      value = [value];
    if (value === null || value === undefined)
      value = [null];
    if (!Array.isArray(value) || !value.every(item => item === null || typeof item === 'string'))
      throw new Error(`expected [${name}] to be: string | null | (string | null)[]`);
    return value;
  };
}

function coerceRotate(name: string) {
  return (value: string | number): number => {
    if (typeof value === 'string')
      value = Number(value);
    if (typeof value !== 'number')
      throw new Error(`expected [${name}] to be: string | number`);
    return value;
  };
}

function coerceOpacity(value: number): number {
  if (typeof value !== 'number' || value < 0)
    throw new Error('expected [fillOpacity] to be: number >= 0');
  return value;
}

@Component({
  selector: 'icon[type]',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent extends SizeDirective {
  readonly type = input.required<icon, string | icon>({ transform: coerceType });
  readonly fill = input<(string | null)[], string | null | (string | null)[]>([null], { transform: coerceColors('fill') });
  readonly fillRotate = input<number, string | number>(0, { transform: coerceRotate('fillRotate') });
  readonly fillOpacity = input(1, { transform: coerceOpacity });
  readonly stroke = input<(string | null)[], string | null | (string | null)[]>(['current'], { transform: coerceColors('stroke') });
  readonly strokeRotate = input<number, string | number>(0, { transform: coerceRotate('strokeRotate') });
  readonly spin = input<'x' | 'y' | 'z' | null>(null);

  readonly id = `${Math.random().toString(36).substring(2, 13)}`;

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
