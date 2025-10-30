# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-10-30

### Added

- The `Clouds` class exposes the `update` and `draw` methods, that can be used to manually handle animation frames 

## [1.0.0] - 2025-10-16

### Added

- The `clouds.js` file contains the main source.
- The `clouds.min.js` file contains the minified version, which constitutes the actual release.
- The module has the following exported functionalities:
  - The static functions `createCloud` and `drawCloud` allow access to the low level functionalities of cloud creation and rendering. 
  - The `Clouds` class provides a streamlined way of animating clouds on an HTML canvas.
- The `example` folder contains an usage example.
- The `README.md` and `CHANGELOG.md` file are self-explanatory.