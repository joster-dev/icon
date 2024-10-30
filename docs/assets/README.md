# icon
icon is an [Angular](https://angular.io/) library with dynamic components that contain scalable vector graphics
- [Repository](https://github.com/joster-dev/icon)
- [Github Package](https://github.com/joster-dev/icon/packages/327210)
- [Demo](https://joster-dev.github.io/icon/)

## getting started
update your `package.json`
```bash
npm install @joster-dev/icon --save
```
import the module
```diff
+ import { IconModule } from '@joster-dev/icon';

@NgModule({
  imports: [
+    IconModule
  ],
})
```

## `icon` component
### **`fill`** input expects `string | string[] | null` defaults to `null`
- for body color
- when `string[]`
  - vertical gradient left to right
- when `'current'`
  - uses [`currentColor`](https://www.w3.org/wiki/CSS3/Color/currentColor)

### **`fillRotate`** input expects `boolean` defaults to `false`
- for rotate **`fill`** by 90°
- useful when **`fill`** is `string[]`

### **`fillOpacity`** input expects `number` defaults to `0`
- for **`fill`** transparency
- `1` is solid color
- `0` is transparent

### **`stroke`** input expects `string | string[] | null` defaults to `null`
- for outline color
- when `string[]`
  - vertical gradient left to right
- when `null`
  - uses [`currentColor`](https://www.w3.org/wiki/CSS3/Color/currentColor)

### **`strokeRotate`** input expects `boolean` defaults to `false`
- for rotate stroke by 90°

### **`size`** input expects `<length> | <percentage>` defaults to `'100%'`
- for scaling width and height
- **`spin`** input expects `'x' | 'y' | 'z'`
  - for linear rotation animation 

### **`type`** input expects `string`
  - for icon selection

## `icon-stack` component
- for containing multiple `icon` which will appear on top of one another
<!-- *can horizontally and vertically center contained icons* -->

### **`size`** input expects `<length> | <percentage>` defaults to `'100%'`
  - for scaling width and height of all contained `icon`
