# Second Cube

An experiment on infinite sequences and CSS animations.

## Dependencies

    - node >= 0.8.14
    - grunt-cli ~0.1.6
    - volo ~0.2.7

## Infinite sequences

The faces of the cube are represented by an infinite object sequence, which
contains five diferent objects:

  - floor
  - left
  - back
  - right
  - front

Each one of these objects sets its own state, and has the ability to return the
next object in the sequence. The relevant difference in each object's state is
the class name that will be assigned to the rendered DOM element, which is used
as a CSS hook for animation and syling.

## CSS animations and transitions

Since each face of the cube represents a known state, it is possible to create
specific animation for each face. Every animation will run only once, and is
determined by the state provided by each object in the above mentined sequence.

## Building and running the project

Provided all the dependencies are met, you just need to run ```grunt``` in the
project's direcoty to run the project locally.
