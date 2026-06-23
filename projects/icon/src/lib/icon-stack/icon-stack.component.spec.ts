import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconStackComponent } from './icon-stack.component';
import { DebugElement } from '@angular/core';

describe('IconStackComponent', () => {
  let component: IconStackComponent;
  let fixture: ComponentFixture<IconStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconStackComponent]
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
    let container: DebugElement;

    beforeEach(() => {
      component.size = size;
      container = fixture.nativeElement.children[0];
    });

    it('should equal width', () => {
      expect(container.styles['width']).toEqual(size);
    });

    it('should equal height', () => {
      expect(container.styles['height']).toEqual(size);
    });
  });
});
