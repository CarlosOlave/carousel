carousel
========

carousel widget is a CSS3 3D transform-base plugin that replicates the Cylinder, Time Machine, and Cover Flow effects. 

The required files for the carousel widget are jquery.min.js and carousel.js (below)

```html
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="src/js/carousel.js"></script>
```

To utlize the carousel widget simple add section with id='carousel-container', a div with id='carousel' and then finally 
add a div with id='image-container' for each of the images you want the carousel to display.

You can also specify few data-attributes:

    data-reflection -> specifies if the carousel will render a reflection for each of the images displayed. (default is false)
    data-mode -> supports cylinder, timeMachine, and coverFlow. (default is cylinder)
    data-reflection-color -> if reflection is used then this attribute enables the user to specify the fading background color
                             of the reflection (defaults to transparent)

```html
    <section id='carousel-container'>
      <div id='carousel' data-reflection='true' data-mode='cylinder' data-reflection-color='rgb(74,86,10)'>
        <div class='image-container'>
          <img src='src/images/amazon_1.jpg'>
        </div>
        ...
      </div>
    </section>
```
Live demo: http://caos.nodejitsu.com/carousel

Tested in:

    Chrome (latest)
    Safari (latest)
    Firefox (latest) (issue with transformations)

TODO:

    1) Implement bi-directional click events. Currently the click only works in one direction then the carousel is reset
       to its original state.
    2) Fix issue with Firefox transformations.
    3) Add support for IE browser.
