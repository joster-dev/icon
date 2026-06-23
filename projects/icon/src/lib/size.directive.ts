import { Directive, input } from '@angular/core';

function coerceSize(value: string | number | null | undefined): string {
  if (value === null || value === undefined)
    return '100%';
  if (typeof value === 'number' && value >= 0 && value <= 100)
    return `${value}%`;
  if (typeof value !== 'string')
    throw new Error('size input must be: string');
  // todo: write regex
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/height
  return value;
}

@Directive()
export class SizeDirective {
  readonly size = input('100%', { transform: coerceSize });
}
