# Todo App

## Опис проєкту

**Todo App** --- вебзастосунок для управління завданнями, розроблений з
використанням **React** та **Redux Toolkit**.

Застосунок дозволяє переглядати, додавати, видаляти та оновлювати
завдання, а також фільтрувати їх за статусом виконання.

Для роботи з даними використовується REST API.

## Основні можливості

- Перегляд списку завдань
- Додавання нового завдання
- Видалення завдання
- Зміна статусу завдання
- Фільтрація завдань:
  - `All` --- усі завдання
  - `Active` --- активні завдання
  - `Completed` --- виконані завдання
- Відображення індикатора завантаження
- Обробка помилок API
- Асинхронна робота через Redux Thunks
- Централізоване управління станом через Redux Toolkit
- Адаптивний інтерфейс

## Використані технології

- React
- JavaScript
- Redux Toolkit
- React Redux
- Vite
- REST API
- Fetch API
- CSS

## Структура проєкту

```text
todo-app/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── store.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   │
│   │   ├── TodoFilter/
│   │   │   ├── TodoFilter.jsx
│   │   │   └── TodoFilter.css
│   │   │
│   │   ├── TodoForm/
│   │   │   ├── TodoForm.jsx
│   │   │   └── TodoForm.css
│   │   │
│   │   └──  TodoList/
│   │      ├── TodoList.jsx
│   │      ├── TodoList.css
│   │      ├── TodoItem.jsx
│   │      └── TodoItem.css
│   │
│   │
│   │
│   ├── features/
│   │   └── todos/
│   │       ├── todosSlice.js
│   │       └── todosThunks.js
│   │
│   │
│   ├── pages/
│   │   ├── TodoPage.jsx
│   │   └── TodoPage.css
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── vite.config.js
├── index.html
└── README.md
```

## Архітектура проєкту

Проєкт розділений на окремі рівні відповідальності.

### `app/`

Містить глобальні налаштування Redux.

#### `store.js`

Створює Redux Store та підключає reducers.

### `components/`

Містить компоненти користувацького інтерфейсу.

#### `Header/`

Відповідає за заголовок застосунку.

#### `TodoForm/`

Містить форму для створення нового завдання.

#### `TodoList/`

Відповідає за відображення списку завдань.

#### `TodoItem/`

Представляє окреме завдання та дозволяє змінювати його статус або
видаляти його.

#### `TodoFilter/`

Відповідає за фільтрацію завдань:

- `All`
- `Active`
- `Completed`

## Redux

Redux Toolkit використовується для централізованого управління станом.

Основний state:

```js
{
  items: [],
  status: "idle",
  error: null,
  filter: "all"
}
```

### `items`

Містить список завдань.

### `status`

Визначає стан асинхронного запиту:

- `idle`
- `loading`
- `success`
- `failed`

### `error`

Містить інформацію про помилку.

### `filter`

Містить поточний фільтр:

- `all`
- `active`
- `completed`

## Redux Slice

Файл:

```text
src/features/todos/todosSlice.js
```

Відповідає за:

- початковий стан;
- reducers;
- зміну фільтра;
- очищення списку;
- обробку результатів асинхронних операцій.

Приклад:

```js
setFilter(state, action) {
  state.filter = action.payload;
}
```

## Redux Thunks

Файл:

```text
src/features/todos/todosThunks.js
```

Містить асинхронні операції, створені за допомогою `createAsyncThunk`.

Основні операції:

```text
fetchTodos()
addTodo()
updateTodo()
deleteTodo()
```

## Production Build

Створення production-збірки:

```bash
npm run build
```

Перегляд production-збірки:

```bash
npm run preview
```

## Принципи розробки

Під час створення проєкту використовуються:

- компонентний підхід React;
- розділення відповідальності;
- повторне використання компонентів;
- Redux Toolkit;
- Redux Slices;
- Redux Thunks;
- централізоване управління станом;
- відокремлення API-логіки від UI;
- обробка станів `loading`, `success` та `error`;
- адаптивна верстка;
- чистий та зрозумілий код.

## Можливі покращення

У майбутньому можна додати:

- редагування тексту завдання;
- пошук;
- сортування;
- пріоритети завдань;
- дедлайни;
- авторизацію;
- власний backend;
- базу даних;
- темну тему;
- drag & drop;
- статистику виконання;
- React Router;
- TypeScript;
- unit та integration тести.
