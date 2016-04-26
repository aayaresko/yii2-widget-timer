# yii2-widget-timer
Simple timer widget for yii2-based applications

## Widget timer on jquery plugin.
Displays time elapsed since timer started in format HH:MM:SS:
* HH - elapsed hours;
* ММ - elapsed minutes;
* CC - elapsed seconds;
It can run automatically (after page is load) or manually. It is possible to stop and reset the timer.

## Installation
The preferred way to install extension is via [composer](http://getcomposer.org/download/). Check the [composer.json](https://github.com/aayaresko/yii2-widget-timer/blob/master/composer.json) for this extension's requirements and dependencies.

To install, either run
```
$ php composer.phar require aayaresko/yii2-widget-timer "*"
```
or add
```
"aayaresko/yii2-widget-timer": "*"
```
to the ```require``` section of your `composer.json`.

## Usage
Upload all necessary components and prepare widget
```php
use aayaresko\timer\Timer
Timer::widget([
    'options' => [
        'container' => '.timer',
        'autoStart' => true,
    ]
])
```
Add an html tag with class name 'timer' in any place of your html.
Content of this tag will be replaced by widget.
```php
<div class="timer"></div>
```
Working copy of plugin will be in global scope and can be controlled via $.fn.timer.worker.
Timer will run automatically after initialization (if 'autoStart' parameter is specified) and assigned to a container with class 'timer' ('container' property).

Run the timer
```php
    $.fn.timer.worker.go();
```

Plugin configuration:
* container - html selector of timer container element (default - '.timer');
* autoStart – whether to start timer automatically after initialization (default - true);
* hours – start hours count from this value (default '00');
* minutes – start minutes count from this value (default '00');
* seconds – start seconds count from this value (default '00');
* animate - whether to run animation when timer starts (blinking);
* animationSpeed - speed of animation;
* animationTimes - number of blinking;

Plugin control:
* init(value) - initialize the timer, only displays the timer (value == false) or run timer automatically (value == true), if timer is already running this actions will stop the timer and reset all of its counters (hours, minutes, seconds);
* go() - run the timer;
* stop(value) - stop the timer and keep counters (hours, minutes, seconds) (value == false) or reset them (value == true);
* flush() - reset the timer counters (hours, minutes, seconds).
* timeAsString() - return the current time values as string.

## License
**yii2-widget-timer** is released under the BSD 3-Clause License. See the bundled `LICENSE.md` for details.
