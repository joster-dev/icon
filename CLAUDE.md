# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@joster-dev/icon` is an Angular 18 library that renders SVG icons as inline `<svg>` markup, with per-icon fill/stroke gradient and animation support. This is an Angular CLI **multi-project workspace** with two projects defined in [angular.json](angular.json):

- `icon` (`projects/icon`) — the publishable library (`projectType: library`, built with ng-packagr). Component prefix `jo`.
- `demo` (`projects/demo`) — a demo/docs app (`projectType: application`) deployed to GitHub Pages. Component prefix `demo`.

## Critical: build the library before running the demo

The demo imports the library via the bare specifier `icon` (e.g. `import { iconTypes, icon } from 'icon'`). [tsconfig.json](tsconfig.json) maps `"icon"` → `./dist/icon`, the **build output**, not the source. So the demo will not compile against source changes until the library is rebuilt.

When iterating on the library and verifying through the demo:

```bash
ng build icon --watch    # rebuild dist/icon on every source change
ng serve                 # serve the demo (in a separate terminal)
```

A one-off `ng build icon` is enough if you only need the demo to pick up the current library state once.

## Commands

```bash
ng build icon            # build the library to dist/icon
ng serve                 # serve demo at http://localhost:4200 (needs dist/icon to exist)
ng test icon             # run library unit tests (Karma + Jasmine)
ng test demo             # run demo unit tests
ng test icon --include='**/icon.component.spec.ts'   # run a single spec file
npm run pages            # build demo into docs/ with the GitHub Pages base-href
npm run package          # build lib + copy LICENSE + npm publish (Windows: uses PowerShell)
```

Note: `npm run _copy-license` (part of `npm run package`) shells out to `powershell` and is Windows-specific.

## Architecture

The entire icon set lives in **one component**, not one component per icon.

- [icon.component.ts](projects/icon/src/lib/icon.component.ts) + [icon.component.html](projects/icon/src/lib/icon.component.html): a single `IconComponent` (selector `icon[type]`) renders a `<svg viewBox="0 0 100 100">`. The template is a flat list of SVG primitives each guarded by `*ngIf="type === '...'"` — adding an icon means adding a new shape block here, not a new file.
- [icon-types.const.ts](projects/icon/src/lib/icon-types.const.ts): the `iconTypes` array (`as const`) is the **single source of truth** for valid icon names. [icon.type.ts](projects/icon/src/lib/icon.type.ts) derives the `icon` union type from it. To add an icon: add the name here AND a matching `*ngIf` block in the template.
- [size.directive.ts](projects/icon/src/lib/size.directive.ts): `SizeDirective` holds the `size` input and emits `sizeChangesSubject`. Both `IconComponent` and `IconStackComponent` **extend** it to share sizing behavior.
- [icon-stack/icon-stack.component.ts](projects/icon/src/lib/icon-stack/icon-stack.component.ts): `IconStackComponent` (selector `icon-stack`) overlays multiple icons; it subscribes to `sizeChangesSubject` to propagate its size to host width/height.
- [icon.module.ts](projects/icon/src/lib/icon.module.ts): `IconModule` declares/exports the components (consumers import this NgModule — the library is module-based, not standalone).
- [public-api.ts](projects/icon/src/public-api.ts): the library's public surface; ng-packagr's `entryFile`. Anything consumers should import must be re-exported here.

### Gradient/color model

`fill` and `stroke` inputs accept `string | null | (string | null)[]`. Internally each is normalized to an array and rendered as an SVG `<linearGradient>` (`fill-gradient-{id}` / `stroke-gradient-{id}`, where `id` is a random per-instance string). Color strings are bare hex without `#` (the component prepends it); the special value `'current'` maps to `currentColor`. `fillRotate`/`strokeRotate` rotate the gradient; `spin` (`'x'|'y'|'z'`) applies a CSS rotation animation.

### Input validation convention

Every `@Input` uses an explicit getter/setter pair backed by a `_`-prefixed field. Setters coerce types (e.g. string→array, string→number) and `throw new Error('expected [input] to be: ...')` on invalid values rather than failing silently. Follow this pattern when adding inputs.

## Conventions

- Strict TypeScript is on, plus `noPropertyAccessFromIndexSignature`, `noImplicitOverride`, `noImplicitReturns`. Angular `strictTemplates` is enabled — template type errors fail the build.
- Library components use SCSS (`schematics` default). Demo components are configured as **non-standalone** (NgModule-based) via angular.json schematics.
- `useDefineForClassFields: false` + `experimentalDecorators` — relevant if touching field initialization order around decorated inputs.
