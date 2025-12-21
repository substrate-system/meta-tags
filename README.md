# meta-tags
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/meta-tags/nodejs.yml?style=flat-square)](https://github.com/substrate-system/meta-tags/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/meta-tags?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/meta-tags)](https://packagephobia.com/result?p=@substrate-system/meta-tags)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)


Generate Open Graph meta tags and Cloudinary image URLs for social
media previews.

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [CLI](#cli)
  * [Output placeholder meta tags](#output-placeholder-meta-tags)
  * [Generate a Cloudinary image URL](#generate-a-cloudinary-image-url)
- [API](#api)
  * [`MetaImage`](#metaimage)
  * [`metas`](#metas)
- [Example](#example-1)
- [Modules](#modules)
  * [ESM](#esm)
  * [Common JS](#common-js)
  * [pre-built JS](#pre-built-js)

<!-- tocstop -->

</details>

## Install

```sh
npm i -S @substrate-system/meta-tags
```

## CLI

Run with `npx` if it is installed locally.

```sh
npx metas
```

### Output placeholder meta tags

Run without arguments to output all meta tags with placeholder values.

```sh
npx metas
```

```html
<meta property="og:title" content="placeholder" />
<meta property="og:type" content="placeholder" />
<meta property="og:site_name" content="placeholder" />
<meta property="og:url" name="og:url" content="placeholder" />
<meta property="og:image" content="placeholder" />
<meta property="og:description" content="placeholder" name="description" />
```

### Generate a Cloudinary image URL

Use the `image` command to generate a Cloudinary meta image URL:

```sh
npx @substrate-system/meta-tags image --cloud-name mycloud --filename image.jpg

# https://res.cloudinary.com/mycloud/image/upload/w_1200,h_627,c_fit,q_auto,f_auto/image.jpg
```

With a text overlay:

```sh
npx @substrate-system/meta-tags image -c mycloud -f image.jpg -t "Hello World"
```

#### Options

| Option | Alias | Description | Required |
|--------|-------|-------------|----------|
| `--cloud-name` | `-c` | Cloudinary cloud name | Yes |
| `--filename` | `-f` | Image filename (including extension) | Yes |
| `--text` | `-t` | Optional text overlay | No |

## API

### `MetaImage`

Use Cloudinary to generate an image URL optimized for Open Graph meta tags.
Creates 1200x627px images.

```ts
function MetaImage ({ cloudName, filename, text }:{
    cloudName:string;
    filename:string;
    text?:string;
}):string
```

#### Without text overlay

```js
import { MetaImage } from '@substrate-system/meta-tags'

const imageUrl = MetaImage({
    cloudName: 'my-cloud',
    filename: 'my-image.jpg'
})
// => https://res.cloudinary.com/my-cloud/image/upload/w_1200,h_627,c_fit,q_auto,f_auto/my-image.jpg
```

#### With text overlay

When text is provided, creates a 1200x800px canvas with:
- 50px top padding
- Image fitted to 1200x500px
- White background
- Text overlay positioned at the bottom

```js
const imageUrl = MetaImage({
    cloudName: 'my-cloud',
    filename: 'cube.png',
    text: 'Hello World'
})
// Generates a URL with text overlay
```

### `metas`

Generate an array of Open Graph meta tag strings.

```ts
function metas (opts:{
    title:string;
    description:string;
    image?:string;
    type?:string;
    name?:string;
    url?:string;
}):string[]
```

#### Example

```js
import { metas } from '@substrate-system/meta-tags'

const metaTags = metas({
    title: 'My Page Title',
    description: 'A description of my page',
    image: 'https://example.com/image.jpg',
    type: 'website',
    name: 'My Site Name',
    url: 'https://example.com/page'
})
```

## Example

Generate meta tags with a Cloudinary image:

```js
import { MetaImage, metas } from '@substrate-system/meta-tags'

const imageUrl = MetaImage({
    cloudName: 'my-cloud',
    filename: 'banner.jpg',
    text: 'Welcome to My Site'
})

const metaTags = metas({
    title: 'My Awesome Page',
    description: 'Learn about awesome things',
    image: imageUrl,
    type: 'website',
    url: 'https://example.com'
})

// Insert into your HTML
metaTags.forEach(tag => {
    // Append to document head or use server-side
})
```

## Modules

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM

```js
import { MetaImage, metas } from '@substrate-system/meta-tags'
```

### Common JS
```js
const { MetaImage, metas } = require('@substrate-system/meta-tags')
```

### pre-built JS
This package exposes minified JS files.
Copy them to a location accessible to your web server,
then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/meta-tags/dist/index.min.js ./public/meta-tags.min.js
```

#### HTML
```html
<script type="module" src="./meta-tags.min.js"></script>
```
