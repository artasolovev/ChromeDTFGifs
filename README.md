
# DTF comments with Tenor [BETA]

Расширение для Google Chrome, которое добавляет интеграцию сервиса Tenor в блок комментариев DTF. 

![Alt text](https://i.ibb.co/fxZ4SWd/SCR-20230824-ocfj.png)


## Установка

Пока что расширение в статусе BETA и не выложено в Chrome Extension Store.

```
1. На этой странице необходимо нажать: Code - Download ZIP
2. Распаковать ZIP в удобное для вас место 
3. В Chrome перейти в chrome://extensions/ и включить Developer mode (Режим разработчика)
4. Нажать Load Unpacked (Загрузить распакованное) 
5. Выбрать разархивированную папку 
6. Расширение должно загрузиться
7. На страницах DTF при написании комментария, примерно через 2 секунды 
после загрузки страницы будет появляться кнопка GIF. 
```


## Известные проблемы

- Error: Could not establish connection. Receiving end does not exist в background.js 

- Выставлен setTimeout() на загрузку суммарно в 2 секунды (костыль) 

- Блок GIF не скрывается при реплае на комментарий
## Roadmap

- Оптимизация загрузки расширения (переработать костыль)
- Скрытие блока с GIF при реплае
- Добавление категорий GIF
- Исправление багов




## Лицензия

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

