

### text

> Text ( [text]  [font]  [color] )

```js
var text = new createjs.Text(
  "Hello World",  // text
  "20px Arial",   // style
  "#ff7700");     // color
text.x = 100; // position
```

#### align

```js
text.textAlign = 'left';
text.textAlign = 'right';
text.textAlign = 'center';
```

#### register (persent)

```js
// @OVERRIDING
setPoint(percentX/*0~100*/, percentY/*0~100*/) {
  if(text.getBounds()) {
    text.regX = text.getBounds().width * percentX / 100;
    text.regY = text.getBounds().height * percentY / 100;
  }
}
```
