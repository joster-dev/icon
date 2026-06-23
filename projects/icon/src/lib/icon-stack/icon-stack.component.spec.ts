import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';

import { IconStackComponent } from './icon-stack.component';

describe('IconStackComponent', () => {
  let component: IconStackComponent;
  let fixture: ComponentFixture<IconStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconStackComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('size input', () => {
    const size = '1em';
    let host: DebugElement;

    beforeEach(() => {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      host = fixture.debugElement;
    });

    it('should equal width', () => {
      expect(host.styles['width']).toEqual(size);
    });

    it('should equal height', () => {
      expect(host.styles['height']).toEqual(size);
    });
  });
});
