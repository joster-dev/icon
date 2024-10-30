import { Component } from '@angular/core';

import { iconTypes, icon } from 'icon';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly iconStartText = '<icon';
  readonly iconEndText = '></icon>';
  readonly iconText = '<icon type></icon>';
  readonly iconStackText = '...</icon-stack>';

  searchTerm: string | null = null;
  typeItem = new IconTypeItem('circle');
  iconStackDemo: icon[] = ['times', 'ring'];

  iconTypes = iconTypes;
  iconTypeItems = iconTypes.map(item => ({ key: item, value: item }));
  rotateItems = [
    { key: 0, value: '0' },
    { key: 45, value: '45' },
    { key: 90, value: '90' },
  ]
  spinItems = [
    { key: 'x', value: 'x' },
    { key: 'y', value: 'y' }
  ];
  opacityItems = [
    { key: 1, value: '1' },
    { key: 0.7, value: '0.7' },
    { key: 0.4, value: '0.4' }
  ];

  constructor() { }

  get filteredTypes() {
    if (this.searchTerm === null)
      return this.iconTypes;

    return this.iconTypes
      .filter(item => item.toLowerCase().includes(this.searchTerm!.toLowerCase()));
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

  onClickIcon(icon: icon) {
    this.typeItem.type = icon
  }

  onClickRefine() {
    this.searchTerm = null;
  }

  onClickAddIcon() {
    this.iconStackDemo.push('circle');
  }

  mapColors(items: { color: string | null }[]) {
    return items.map(item => item.color);
  }

  htmlCode(item: IconTypeItem) {
    let lines = [
      `<icon type="${item.type}"`,
      `[fill]="[${item.fill.map(fill => `${fill.color === null ? 'null' : `'${fill.color}'`}`).join(', ')}]"`,
      `[fillRotate]="${item.fillRotate}"`,
      `[stroke]="[${item.stroke.map(stroke => `${stroke.color === null ? 'null' : `'${stroke.color}'`}`).join()}]"`,
      `[strokeRotate]="${item.strokeRotate}"`,
      `[spin]="${item.spin}"`,
      `></icon>`
    ];


    lines = lines.map((line, index) => {
      if (index > 0 && index < lines.length - 1)
        return `  ${line}`;
      return line;
    });
    return lines;
  }
}

class IconTypeItem {
  fill: { color: string | null }[] = [
    { color: '700024' },
    { color: '000000' },
    { color: '002470' },
  ];
  fillRotate = 0;
  fillOpacity = 1;
  stroke = [
    { color: 'FFFFFF' }
  ];
  strokeRotate = 0;
  spin: 'x' | 'y' | null = null;

  constructor(
    public type: icon,
  ) { }
}
