<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
use Bitrix\Main\Loader;

use Bitrix\Main\Engine\Contract\Controllerable;

class OwnKanban extends \CBitrixComponent implements Controllerable
{
    //Родительский метод проходит по всем параметрам переданным в $APPLICATION->IncludeComponent
    //и применяет к ним функцию htmlspecialcharsex. В данном случае такая обработка избыточна.
    //Переопределяем.
    public function onPrepareComponentParams($arParams)
    {


        $addTaskButton = new \Bitrix\UI\Buttons\Button([
          "link" => "/company/personal/user/830/tasks/task/edit/0/",
          "text" => "Добавить задачу",
        "color"=> \Bitrix\UI\Buttons\Color::SUCCESS,
      ], $location = "after_title");
      
      $optionsButton = new \Bitrix\UI\Buttons\Button([
      
          "text" => "Настройки",
        "color"=> \Bitrix\UI\Buttons\Color::SUCCESS,
      ], $location = "after_title");
      
      $optionsButton->addClass('set-connected-groups-button');
      $optionsButton->addClass('ui-btn ui-btn-icon-setting');
      
      
      \Bitrix\UI\Toolbar\Facade\Toolbar::addButton($addTaskButton);
      \Bitrix\UI\Toolbar\Facade\Toolbar::addButton($optionsButton);

      $result = array(
        "CACHE_TYPE" => $arParams["CACHE_TYPE"],
        "CACHE_TIME" => isset($arParams["CACHE_TIME"]) ?$arParams["CACHE_TIME"]: 36000000,
        "X" => intval($arParams["X"]),
    );
    return $result;
      
    }

    protected function checkModules()
    {
        if (!Loader::includeModule('iblock'))
            throw new SystemException(Loc::getMessage('CPS_MODULE_NOT_INSTALLED', array('#NAME#' => 'iblock')));
    }




    public function executeComponent()
    {
        //if($this->startResultCache())//startResultCache используется не для кеширования html, а для кеширования arResult
        
            $this->arResult["Y"] = $this->sqr($this->arParams["X"]);
           $this->checkModules(); //ы проверяем подключен ли модуль Инфоблоков Битрикс.
            $this->getResult();
            $this->includeComponentTemplate();
       
        // return $this->arResult["Y"];
    }

    public function configureActions()
    {
       // Сбрасываем фильтры по-умолчанию (ActionFilter\Authentication и ActionFilter\HttpMethod)
       // Предустановленные фильтры находятся в папке /bitrix/modules/main/lib/engine/actionfilter/
        return [
            'greet' => [ // Ajax-метод
                'prefilters' => [],
            ],
        ];
    }

    protected function getResult()
    {

    }


    //Дальше уже сами методы класса
    public function sqr($x)
    {
        return $x * $x;
    }

    public function greetAction($person = 'guest')
    {
        return "Hi {$person}!";
    }
}
