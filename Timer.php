<?php
/**
 * Created by PhpStorm.
 * User: aayaresko
 * Date: 28.04.15
 * Time: 11:45
 * 
 * @copyright Copyright &copy; Andrej Jaresko, disbalans.net, 2015
 * @package yii2-widgets
 * @subpackage yii2-widget-timer
 */

namespace aayaresko\timer;

use yii\base\Widget;
use yii\helpers\Json;

/**
 * Class Timer - строит widget в виде plugin timer.
 *
 * Доступ к plugin и его методам можно получить обратившись к рабочему объекту $.fn.timer.worker
 *
 * Настройка plugin осуществляется через передачу именованных переменных в  виде массива $options где:
 * 1. индекс элемента массива - название параметра (см. возможные параметры);
 * 2. значение элемента с текущим индексом - собственно значение настраиваемого параметра plugin.
 *
 * возможные значения массива $options:
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
 * @var $options array массив параметров, передаваемых скрипту
 * @package yii2-widget-timer
 * @author aayaresko <aayaresko@gmail.com>
 */
class Timer extends Widget{

    public $options = [];

    /**
     * Инициализирует widget.
     *
     * Регистрирует необходимые скрипты.
     *
     */
    public function init() {
        parent::init();
        TimerAsset::register($this->view);
    }

    /**
     * Запускает widget.
     *
     * Настраивает plugin и создаёт в памяти объект $.fn.timer.worker
     * для управления работой таймера.
     *
     */
    public function run(){
        parent::run();
        $options = Json::encode($this->options);
        $this->view->registerJs('
            $.fn.timer.worker = $.fn.timer(' . $options . ');
            $.fn.timer.worker.init();
        ');
    }
}
