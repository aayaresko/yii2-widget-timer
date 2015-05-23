<?php
/**
 * Created by PhpStorm.
 * User: aayaresko
 * Date: 28.04.15
 * Time: 11:50
 * 
 * @copyright Copyright &copy; Andrej Jaresko, disbalans.net, 2015
 * @package yii2-widgets
 * @subpackage yii2-widget-timer
 */

namespace aayaresko\timer;

use yii\web\AssetBundle;
use yii\web\View;

/**
 * Class TimerAsset - регистрирует скрипт plugin timer.
 *
 * Plugin явно зависит от библиотеки jQuery.
 *
 * @package yii2-widgets
 * @author aayaresko <aayaresko@gmail.com>
 */
class TimerAsset extends AssetBundle {

    public $sourcePath = '@vendor/aayaresko/yii2-widget-timer/assets';

    public $publishOptions = [
        'forceCopy' => true
    ];

    public $js = [
        'timer.js',
    ];

    public $jsOptions = [
        'position' => View::POS_HEAD
    ];

    public $depends = [
        'yii\web\JqueryAsset',
    ];
} 
