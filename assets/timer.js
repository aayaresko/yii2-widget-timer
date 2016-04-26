/**
 * Created by aayaresko on 30.04.15.
 */

/**
 * Timer plugin.
 *
 * Отображает время, прошедшее со старта timer в формате ЧЧ:ММ:СС где:
 * 1. ЧЧ - кол-во прошедших с момента запуска часов;
 * 2. ММ - кол-во прошедших с момента запуска минут;
 * 2. CC - кол-во прошедших с момента запуска секунд;
 * Может быть запущен автоматически и вручную, может быть остановлен, сброшен
 *
 * Конфигурация plugin осуществляется через параметры:
 * 1. container - селектор html элемента, в котором необходимо отобразить таймер (по умолчанию '.timer');
 * 2. autoStart – запустить таймер сразу же после инициализации (по умолчанию - true);
 * 3. hours – начать счёт часов с этого значение (по умолчанию '00');
 * 4. minutes – начать счёт минут с этого значение (по умолчанию '00');
 * 5. seconds – начать счёт секунд с этого значение (по умолчанию '00');
 * 6. animate - анимировать таймер при запусе (мигание);
 * 7. animationSpeed - скорость анимации;
 * 8. animationTimes - количество повторений;
 *
 * Управление plugin осуществляется через методы:
 * 1. init(value) - инициализирует таймер, оформит html-содержимое container в виде таймера (если value == false) или запустит таймер автоматически (если value == true),
 * при этом, если таймер был ранее запущен автоматически остановит таймер и обнулит значения часов, минут, сукунд;
 * 2. go() - запустит таймер;
 * 3. stop(value) - остановит таймер сохранив текущие значение часов, минут, секунд (если value == false) или обнулит их (если value == true);
 * 4. flush() - сбросит таймер, обнулив значения часов, минут, секунд.
 *
 * @package yii2-widgets
 * @author aayaresko <aayaresko@gmail.com>
 */

(function( $ ) {
    $.fn.timer = function( options ){
        var plugin = {
            options: $.extend({
                'container': ".timer",
                'seconds': 0,
                'minutes': 0,
                'hours': 0,
                'animate': true,
                'animationSpeed': 200,
                'animationTimes': 3,
                'autoStart': true
            }, options),
            isRunning: false,
            getTimeAsString: function () {
                return plugin.formatDate();
            },
            getTime: function () {
                plugin.options.seconds += 1;
                plugin.calculate();
                $(plugin.options.container).html( plugin.formatDate() );
            },
            setTime: function ( seconds, minutes, hours ) {
                plugin.options.seconds = seconds;
                plugin.options.hours = minutes;
                plugin.options.minutes = hours;
            },
            flush: function (){
                plugin.setTime( 0, 0, 0 );
                $(plugin.options.container).html( plugin.formatDate() );
                console.log("Success! Timer flushed.");
            },
            formatDate: function (){
                var seconds = plugin.options.seconds,
                    minutes = plugin.options.minutes,
                    hours = plugin.options.hours;
                if( plugin.options.hours < 10 ){
                    hours = "0" + plugin.options.hours;
                }
                if( plugin.options.minutes < 10 ){
                    minutes = "0" + plugin.options.minutes;
                }
                if( plugin.options.seconds < 10 ){
                    seconds = "0" + plugin.options.seconds;
                }
                return hours + ":" + minutes + ":" + seconds;
            },
            calculate: function () {
                if( plugin.options.seconds > 59 ) {
                    plugin.options.minutes += 1;
                    plugin.options.seconds = 0;
                }
                if( plugin.options.minutes > 59 ) {
                    plugin.options.hours += 1;
                    plugin.options.minutes = 0;
                }
                if( plugin.options.hours > 59 ) {
                    plugin.options.hours = 0;
                }
            },
            init: function( autoStart ){
                if( plugin.isRunning ){
                    plugin.stop( true );
                } else {
                    $(plugin.options.container).html( plugin.formatDate() );
                }
                if( autoStart || plugin.options.autoStart ){
                    plugin.go();
                }
            },
            go: function(){
                if( plugin.isRunning ){
                    console.log("Error! Plugin already running!")
                } else {
                    plugin.isRunning = true;
                    plugin.run();
                    plugin.animate( 0 );
                    console.log("Success! Timer started.");
                }
            },
            stop: function( autoFlush ){
                if( autoFlush ) {
                    plugin.flush();
                } else {
                    plugin.isRunning = false;
                }
            },
            run: function(){
                setTimeout(function(){
                    if( plugin.isRunning ){
                        plugin.getTime();
                        plugin.run();
                    } else {
                        console.log("Success! Cycle interrupted.");
                    }
                }, 1000);
            },
            animate: function( done ){
                if( $(plugin.options.container).css("opacity") < 1 ){
                    done += 1;
                    $(plugin.options.container).animate( {opacity:1}, plugin.options.animationSpeed );
                } else {
                    $(plugin.options.container).animate( {opacity:0.1}, plugin.options.animationSpeed );
                }
                setTimeout(function(){
                    if( done < plugin.options.animationTimes ) {
                        plugin.animate( done );
                    }
                }, plugin.options.animationSpeed);
            }
        };
        return {
            init: plugin.init,
            go: plugin.go,
            stop: plugin.stop,
            flush: plugin.flush,
            timeAsString: plugin.getTimeAsString
        };
    };
})(jQuery);
