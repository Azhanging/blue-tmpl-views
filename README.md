# blue-tmpl-views
blut-tmpl-views in express or koa2

install blue-tmpl and blue-tmpl-views in your project

```
npm i blue-tmpl blue-tmpl-views -D;
```

##in express use blue-tmpl

blue-tmpl:http://github.com/azhanging/tmpl


app.js
```javascript
const app = express();
 
const blueTmplViews = require('blue-tmpl-views');
 
blueTmplViews({
  app
});
 
app.set('views','your views filename');
 
/*
* ext is .tmpl
* */
app.set('view engine','tmpl');
```

router.js
```javascript
router.get('/',(req,res)=>{
  res.render('index',{
    a:1,
    b:2
  });
});
```

index.tmpl
```html
<tmpl-extend file="public/layout.tmpl" />
<tmpl-block name="body">
    <div><%= state.a %></div>
    <div><%= state.b %></div>
</tmpl-block>
```

render result:
```html
<div>1</div>
<div>2</div>
```

##in koa2 use blue-tmpl

app.js
```javascript
const app = koa();
 
const blueTmplViews = require('blue-tmpl-views');
 
app.use(blueTmplViews({
  path:'./views'
}));
```

router.js
```javascript
router.get(async (ctx,next)=>{
  await ctx.render('path',{
  	a:1,
    b:1
  });
});
```


index.tmpl
```html
<tmpl-extend file="public/layout.tmpl" />
<tmpl-block name="body">
    <div><%= state.a %></div>
    <div><%= state.b %></div>
</tmpl-block>
```


render result:
```html
<div>1</div>
<div>2</div>
```













