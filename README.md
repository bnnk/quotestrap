# QuoteStrap - JQuery-based Theme selector

Ever Thought that your web doesn't hash a theme selector? Fear not, You can use This!

## Features: Why should I buy it?

### Hooks

You can hook anything into QuoteStrap!

Didn't believe it? try using [my site](https://bkshrinandhan.neocities.org)

### Easy Configurabilty

100% Easy to configure, Just put `<meta>` tags to configure!

### Permanent storage of theme through `localStorage`

Themes are stored permanently using `localStorage` which allows the user to keep his/her theme preference in the browser.

## Embedding to site

In head:

```html
<meta 
name="quotestrap:selector"
content="body > div.container > div > div:nth-child(3)">
<meta 
name="quotestrap:bootswatch-api" 
content="//bootstrap.com/api/4.json">
```

in the end of body:

```html
<script src="/node_modules/quotestrap/pro.js"></script>
<!-- Your hooks -->
```

To embed image of the theme <wherever you want>: (Not required for the theme to function!)

```html
<img id="theme" />
```

You can change any of the parameters of the `img` element but you shouldn't change `id` of of the image element

## Parameters

### `quotestrap:selector` (required)

The element in which quotestrap will be rendered.

### `quotestrap:bootswatch-api` (required)

The api to use for theme list rendering. QuoteStrap can use a list if it matches the schema of Bootswatch's API.

## Trying it for yourself

You can see how powerful QuoteStrap is in [my site](https://bkshrinandhan.neocities.org)