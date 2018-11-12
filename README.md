# РыбаТекст - lorem ipsum на стероидах
[![APMDownloads](https://img.shields.io/apm/dm/fish-text.svg?style=for-the-badge)](https://atom.io/packages/fish-text) ![APMVersion](https://img.shields.io/apm/v/fish-text.svg?style=for-the-badge) ![APMLicense](https://img.shields.io/apm/l/fish-text.svg?style=for-the-badge)

*This package will be more useful for russian speaking users. Basically, it adds an russian alternative of "lorem ipsum" based on universal speech code (see image below).*

Этот пакет позволит прямо в редакторе добавить "рыбный" текст, составленный по универсальному коду речей.

![Универсальный код речей](http://apikabu.ru/img/a5ca6d.jpg)

## Как пользоваться?

Пишем в тексте сниппет `рыба` и жмём клавиши <kbd>Ctrl</kbd> + <kbd>Tab</kbd>.
![Стандартная фича](https://i.imgur.com/oZr3U7i.gif)

Также можно прописать `рыба5` (или любое другое число вместо `5`) и получить текст из соответствующего числа предложений.
![Фича с количеством предложений](https://i.imgur.com/eFpu2H9.gif)

А ещё можно нажать <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd>, и тогда полученный текст будет завёрнут в тег `<p>`.
![Фича с обёрткой в HTML](https://i.imgur.com/VmKvqKs.gif)

## Откуда берётся этот текст?

В пакете используется [FishText API](http://fish-text.ru/api). К нему делается GET-запрос с помощью [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API), которые возвращает JSON с полученным текстом.

## LICENSE

[MIT](LICENSE.md)
