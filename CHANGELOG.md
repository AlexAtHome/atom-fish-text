## 2.0.1

- Поднял версию зависимости `speech-code`. Таким образом *появилось больше комбинаций текста*.

<details>
<summary>Engish</summary>
*Upraised `speech-code` dependency version. That gives much more combinations of text.*
</details>

## 2.0.0

- Заменил обращения к FishText API на промисах на функции из [вот этого пакетика](https://www.npmjs.com/package/speech-code), в следствие чего текст теперь добавляется молниеносно.
- Исправил баг, когда добавление циферки к сниппету `рыба` не давало никакого толка и всё равно возвращался текст из трёх предложений.
- Переписал подписи пунктов меню.

<details>
<summary>Engish</summary>
<ul>
  <li>_Replaced promise based FishText API calls with the functions from [this package](https://www.npmjs.com/package/speech-code)._</li>
  <li>_Fixed the snippet didn't see a number and still returned 3 sentences._</li>
  <li>_Renamed menu labels._</li>
</ul>
</details>

---

## 1.0.1

- Исправил пункты в контекстном меню "Добавить абзац" и в меню "Packges → РыбаТекст → Добавить абзац". Они не работали, пока не будет сниппета `рыба` под курсором.

<details>
<summary>Engish</summary>
<ul>
  <li>_Fixed "Add paragraph" context menu and "Packges → РыбаТекст → Добавить абзац" commands not working witout the `рыба` snippet under the cursor._</li>
</ul>
</details>

---

## 1.0.0 - First *Major* Release! Yay!
- **Указание числа предложений в сниппете** путём написания циферки в конец сниппета. Например, `рыба2` вернёт два предложения, `рыба15` - 15 предложений и так далее. Максимально допустимое число - 100. Без указания числа добавится 3 предложения
- **Вставка текста в HTML-теге `<p>`**: работает с таким же сниппетом при нажатии <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd>

<details>
<summary>Engish</summary>
<ul>
  <li>_**Defining sentences amount within the snippet** by typing the number of them. For example, `рыба2` will return 2 sentences, `рыба15` will return 15 sentences and so on. The maximum available number is 100. Without the number the snippet will return only 3 sentences._</li>
  <li>_**Inserting the text being wrapped in `<p>` HTML-tag.** Works with the same snippet by pressing the <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd> buttons._</li>
</ul>
</details>

------

## 0.1.0 - First Release Ever
Пока что единственная функция - это добаление текста из трёх предложений через Fish Text API при вводе слова `рыба` и нажатии клавиши <kbd>Ctrl</kbd> + <kbd>Tab</kbd>.

<details>
<summary>English</summary>
<i>The only feature at the moment is putting the text from Fish Text API by typing the `рыба` word and pressing the <kbd>Ctrl</kbd> + <kbd>Tab</kbd> key.</i>
</details>
