import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { SizeDirective } from './size.directive';

describe('SizeDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new SizeDirective());
    expect(directive).toBeTruthy();
  });
});
