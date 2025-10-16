# Clouds.js

A JavaScript module for creating and animating clouds on an HTML canvas.


## Usage

Clouds.js is a JavaScript [module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), which means that it can be included in your HTML using the `script` tag with a `type="module"` attribute, like so:

```
<script src="clouds.min.js" type="module"></script>
```

The module's features can be referenced within your own script using an `import` statement and there are **two** sets of features that can be imported depending on the intended usage:
- **Static usage**: you want to access the basic functions for creating and rendering clouds, because you don't need animation or want to do it yourself;
- **Animated usage**: you need a streamlined way of animating clouds on a canvas, it is the preferred way of using the module.

In the following sections we will see how both work, giving some examples that are taken from the `/example` folder of this repository, which can be seen live at this [link](https://www.naccio.net/clouds).

### Static usage

The module exports two functions, `createCloud` and `drawCloud`, that allow to access its basic cloud creation and rendering functionalities.

If you just need to create and render some clouds and **do not need animation** or want to do it by yourself, you can directly import those two functions:

```
import { createCloud, drawCloud } from "./clouds.min.js";
```

In the following example we will see how to create a cloud as big as the screen and render it at its center.

First of all you will need an HTML canvas and its 2D context.

```
const w = window.innerWidth;
const h = window.innerHeight;

const staticBgCanvas = document.getElementById('static-bg-canvas');
const staticBgContext = staticBgCanvas.getContext('2d');

staticBgCanvas.width = w;
staticBgCanvas.height = h;
```

To **create a cloud**, you can call the `createCloud` function, passing it the cloud's position, dimensions, granularity and color.

```
const cloud = createCloud(w / 2, h / 2, w, h, 60, { r: 150, g: 150, b: 150, a: 0.4 });
```

To **render a cloud**, you can pass it to the `drawCloud` function, along with the 2D context where you want to render it.

```
drawCloud(cloud, staticBgContext);
```

### Animated usage

The default export of the module is the `Clouds` class, that allows to create and animate clouds on an HTML canvas.
This class is built on top of the basic functions described in the previous section and provides a simpler way of using that when **animation** is needed.

To use it, you just need to import the class and not the single functions:

```
import Clouds from "./clouds.min.js";
```

Each instance of the class manages the clouds created with it and renders them on an HTML canvas, that must be provided upon construction.

```
const canvas = document.getElementById('canvas');
canvas.width = w;
canvas.height = h;

const clouds = new Clouds(canvas);
```

To add a cloud to the canvas managed by the instance, you can call the `add` method exposed by it. This works as the `createCloud` function, meaning that it needs position, dimensions, granularity and color, but, in addition, it also needs a **speed**, expressed in **pixels per second**.

In the following example, a cloud is created off-screen, so when the animation is run, it will enter from the left and move across the screen towards the right. Once the cloud exits the screen, it will **loop back on the opposite side**.

```
clouds.add(-w * 3 / 4, h * 3 / 4, w * 3 / 4, h * 3 / 4, 30, { r: 230, g: 230, b: 230, a: 0.2 }, 110);
```

To **run the animation** you can call the `run` method on the instance:

```
clouds.run();
```

Similarly, to **pause the animation** you can call the `pause` method:

```
clouds.pause();
```

The **direction** of the clouds can be controlled by calling the `setWindDirection` method and providing it with an angle expressed in radians.

In the following example, after calling the method, the clouds will move at an angle of 45°.

> Note that on an HTML canvas the y axis points downwards, so 45° means south-east on the screen (instead of the more conventional north-east).

```
clouds.setWindDirection(Math.PI / 4);
```

If you want to provide a **background** color to the canvas, you can call the `setSkyColor` and pass it a string representing a CSS color.

> Note that every time the instance renders the clouds on its canvas, it will clear it first, meaning that if you draw other things on it, they will be erased.

```
clouds.setSkyColor('skyblue');
```


## Model

> The idea of this module, especially the cloud generation logic, is inspired by [Cloudgen.js](https://github.com/Ninjakannon/Cloudgen.js). However, the code has been mostly changed, rewritten or added upon (*e.g.* it is now a module instead of an IIFE), so I think it belongs in its own repository. Still, I believe that mentioning where I took inspiration from is the correct thing to do.

Each cloud is represented by an **ellipse** and can be created by providing its position, dimensions, granularity and color. These, as mentioned, are the parameters needed by both the `createCloud` function and the `Clouds.add` method, and they are defined as follows:

```
 /*
 * @param {number} x - The cloud's center on the horizontal axis.
 * @param {number} y - The cloud's center on the vertical axis.
 * @param {number} w - The cloud's width.
 * @param {number} h - The cloud's height.
 * @param {number} circles - The number of circles used to generate the cloud.
 * @param {Object} color - The cloud's color.
 * @param {number} color.r - The color's red value.
 * @param {number} color.g - The color's green value.
 * @param {number} color.b - The color's blue value.
 * @param {number} color.a - The color's alpha value.
 */
 ```

Upon creation, within the boundaries of the ellipse defined by the provided dimensions, a number of **randomly positioned and dimensioned circles** are generated. The number of circles is decided by the `circles` parameter, and is what we called "granularity" up to this point.

Once the circles have been generated, they are pre-rendered on an independent canvas, to avoid re-rendering each circle on every animation frame. In fact, the cloud's canvas is what is rendered by the `drawCloud` function and the `Clouds` class' animation logic.

> Note that this means that, once constructed, **a cloud can no longer be changed** in its dimensions, granularity or color. Only its position can change.