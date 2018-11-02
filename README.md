# РыбаТекст - lorem ipsum на стероидах

*This package will be more useful for russian speaking users. Basically, it adds an russian alternative of "lorem ipsum" based on universal speech code (see image below).*

Этот пакет позволит прямо в редакторе добавить "рыбный" текст, составленный по универсальному коду речей.

![Универсальный код речей](http://apikabu.ru/img/a5ca6d.jpg)

## Как пользоваться?

Пишем тексте сниппет `рыба` и жмём клавишу <kbd>Tab</kbd>. Также, как и со сниппетом `lorem`.

## Откуда берётся этот текст?

В пакете используется [FishText API](http://fish-text.ru/api). К нему делается GET-запрос с помощью [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API), которые возвращает JSON с полученным текстом.

## LICENSE

[MIT](LICENSE.md)
