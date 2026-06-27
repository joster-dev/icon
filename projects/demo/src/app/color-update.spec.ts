import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent color update', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('keeps every fill-gradient id unique across the page', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();
    await fixture.whenStable();

    const root: HTMLElement = fixture.nativeElement;
    const ids = Array.from(root.querySelectorAll('[id^="fill-gradient-"]')).map(
      (el) => el.id,
    );
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it('updates the live preview icon when a jo-color value changes', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();
    await fixture.whenStable();

    const root: HTMLElement = fixture.nativeElement;
    // the live preview icon is the one with 3 fill stops (typeItem.fill)
    const liveIcon = Array.from(root.querySelectorAll('icon')).find(
      (el) => el.querySelectorAll('[id^="fill-gradient-"] stop').length >= 3,
    ) as HTMLElement | undefined;
    expect(liveIcon).toBeTruthy();

    const firstStopColor = () =>
      (
        liveIcon!.querySelector('[id^="fill-gradient-"] stop') as SVGStopElement
      ).getAttribute('stop-color');
    expect(firstStopColor()).toBe('#700024');

    const colorInput = root.querySelector(
      'jo-color input[type="text"]',
    ) as HTMLInputElement;
    colorInput.value = '123456';
    colorInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(firstStopColor()).toBe('#123456');
  });
});
