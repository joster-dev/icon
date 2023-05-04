import { Component } from '@angular/core';

import { iconTypes, icon } from 'dist/icon';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly iconStartText = '<icon';
  readonly iconEndText = '></icon>';
  readonly iconText = '<icon type></icon>';
  readonly iconStackText = '...</icon-stack>';

  searchTerm: string | null = null;
  typeItems: IconTypeItem[] = iconTypes.map(iconType => ({
    type: iconType,
    fill: [
      { color: '247000' },
      { color: '700024' },
      { color: '002470' },
    ],
    fillRotate: '0',
    fillOpacity: 1,
    stroke: [
      { color: 'FFFFFF' }
    ],
    strokeRotate: '0',
    spin: null
  }));
  rotateItems = [
    { key: 0, value: '0' },
    { key: 45, value: '45' },
    { key: 90, value: '90' },
  ]
  spinItems = [
    { key: 'x', value: 'x' },
    { key: 'y', value: 'y' },
    { key: 'z', value: 'z' }
  ];
  opacityItems = [
    { key: 1, value: '1' },
    { key: 0.7, value: '0.7' },
    { key: 0.4, value: '0.4' }
  ];

  constructor() { }

  get filteredTypes(): string[] {
    if (this.searchTerm === null)
      return this.typeItems.map(item => item.type);

    return this.typeItems
      .filter(item => item.type.toLowerCase().includes(this.searchTerm!.toLowerCase()))
      .map(item => item.type);
  }

  get types() {
    return iconTypes
      .map(type => `'${type}'`)
      .join(' | ');
  }

  get iconStackHtmlCode() {
    let lines = [
      '<icon-stack size="10em">',
      `<icon type="times"`,
      `  [fill]="['00FF00', 'FF0000', '0000FF']"></icon>`,
      `<icon type="ring"></icon>`,
      '</icon-stack>'
    ];
    lines = lines.map((line, index) => {
      if (index > 0 && index < lines.length - 1)
        return `  ${line}`;
      return line;
    });
    return lines;
  }

  onRefineClicked() {
    this.searchTerm = null;
  }

  mapColors(items: { color: string }[]) {
    return items.map(item => item.color);
  }

  htmlCode(item: IconTypeItem) {
    let lines = [
      `<icon type="${item.type}"`,
      `size="10em"`,
      `[fill]="[${item.fill.map(fill => `${fill.color === null ? 'null' : `'${fill.color}'`}`).join(', ')}]"`,
      `[fillRotate]="${item.fillRotate}"`,
      `[stroke]="[${item.stroke.map(stroke => `${stroke.color === null ? 'null' : `'${stroke.color}'`}`).join()}]"`,
      `[strokeRotate]="${item.strokeRotate}"`,
      `[spin]="${item.spin}"`,
      `></icon>`
    ]
    lines = lines.map((line, index) => {
      if (index > 0 && index < lines.length - 1)
        return `  ${line}`;
      return line;
    });
    return lines;
  }
}

interface IconTypeItem {
  type: icon;
  fill: { color: string }[];
  fillRotate: string;
  fillOpacity: number;
  stroke: { color: string }[];
  strokeRotate: string;
  spin: 'x' | 'y' | null;
}
