# [Домашнее задание «React»](#react)
# [Домашнее задание «Тестирование»](#test)


# React

## Запуск приложения

`docker build -t front .`

`docker run -p 8080:8080 front`

### Редко используемые компоненты:

Страница `NotFound` - вынесена в отдельный бандл, грузится асинхронно.
Остальные компоненты используются в любом случае (все подключаются либо на странице списка файлов, либо на странице файла).

# Tests

## Модульное тестирование

В папке `api/tests` находятся тесты, структура соответсвует `api/src`.

### Логические блоки API:

* #### Утилиты

Каждая утилита из `api/src/utils` считается отдельным логическим блоком и теструется независимо.

* #### Обработчики исключений

Каждый обработчик из `api/src/handlers` считается отдельным логическим блоком и теструется независимо.

* #### `views`

Каждая функция из `api/src/views` считается отдельным логическим блоком и теструется независимо.

* #### `routes.js`

Содержит только привязку рутов через `express`, не тестрируется.

### Точки расширения:

Каждый логический блок является функцией. Добавлены точки расширения для добавления зашлушек и проверки вызовов.
Все внешние зависимости в функциях берутся следующим образом:

`
    const _callGit = this.callGit || callGit;
`

В тестах при вызове функции биндится контекст с переопределенными методами.

## Интеграционное тестирование

selenium-standalone глобально