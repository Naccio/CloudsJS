# Clouds.js

A JavaScript module for creating and animating clouds on an HTML canvas.

> The cloud generation logic is inspired by [Cloudgen.js](https://github.com/Ninjakannon/Cloudgen.js).


## Usage

Couds.js is a JavaScript [module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), which means that it can be included in your HTML using the `script` tag with a `type="module"` attribute, like so:

```
<script src="clouds.min.js" type="module"></script>
```

At this point, its features can be referenced within your own script using an [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) statement.

There are **two** ways of using the module:
- **Static usage**: exposes the basic functions for creating and rendering clouds, it is useful if you don't need animation or want to do it yourself;
- **Animated usage**: provides a streamlined way of animating clouds on a canvas; it is the preferred way of using the module.

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

To create a cloud you can call the `add` method exposed by the instance. This works as the `createCloud` function, meaning that it needs position, dimensions, granularity and color, but, in addition, it also needs a **speed**, expressed in **pixels per second**.

In the followng example, a cloud is created off-screen, so when the animation is run, it will enter from the left and move across the screen towards the right. Once the cloud exits the screen, it will **loop back on the opposite side**.

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

> Note that every time the instansce renders the clouds on its canvas, it will clear it first, meaning that if you draw other things on it, they will be erased.

```
clouds.setSkyColor('skyblue');
```