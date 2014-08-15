FramesJS [![Build Status](https://travis-ci.org/PauloSanches/framesJS.svg?branch=master)](https://travis-ci.org/PauloSanches/framesJS)
==========

Javascript SpriteSheet Sequence Animation

## Getting Started
Just create an instance of FramesJS and pass params
````js
var frames = new snch.FramesJS('id', {id:'frames'});
````

## Params

| Parameter     | Description       |
|---------------|-------------------|
| id      | ID of frame sequence     |
| options      | Object with animation setup   |

## Options

| Option     | Description       |
|---------------|-------------------|
| parent      | HtmlElement to holder frames instance     |
| fps      | Frames per second of animation   |
| tileWidth      | Width of sprite tile   |
| tileHeight      | Height of sprite tile   |
| autoplay      | Start animation when create new instance   |
| loop      | Animation will restart  automatically |
| reverse      | Animation will play reverse   |
| onComplete      | Function return when animation is over   |


## Methods

| Method      | Description       |
|---------------|-------------------|
| start      | Start animation    |
| stop      | Stop animation   |
