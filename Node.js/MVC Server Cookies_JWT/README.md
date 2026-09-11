# Express.js: PUG та EJS

Навчальний проєкт на **Node.js + Express.js**, у якому використовуються два шаблонізатори:

- **PUG** — для сторінок користувачів.
- **EJS** — для сторінок статей.

## Завдання

### 1. Використання PUG

Сервер віддає сторінки:

- `GET /users`
- `GET /users/:userId`

Для відображення використовується шаблонізатор **PUG**.

### 2. Використання EJS

Сервер віддає сторінки:

- `GET /articles`
- `GET /articles/:articleId`

Для відображення використовується шаблонізатор **EJS**.

---

## Структура проєкту

```text
project/
│
├── controllers/
│   ├── articleController.js
│   ├── rootController.js
│   └── userController.js
│
├── middleware/
│   ├── articleAccessMiddleware.js
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── loggerMiddleware.js
│   ├── sessionMiddleware.js
│   └── validationMiddleware.js
│
├── routes/
│   ├── articleRoutes.js
│   ├── rootRoutes.js
│   └── userRoutes.js
│
├── views/
│   ├── users/
│   │   ├── index.pug
│   │   └── details.pug
│   │
│   └── articles/
│       ├── index.ejs
│       └── details.ejs
│
├── server.js
├── package.json
└── README.md
```

---

## Встановлення

Встановити залежності:

```bash
npm install
```

Якщо PUG та EJS ще не встановлені:

```bash
npm install pug ejs
```

---

## Запуск сервера

```bash
node server.js
```

Після запуску сервер буде доступний за адресою:

```text
http://localhost:3000
```

---

## Маршрути користувачів

### Список користувачів

```http
GET /users
```

Приклад:

```text
http://localhost:3000/users
```

Для сторінки використовується шаблон:

```text
views/users/index.pug
```

### Інформація про користувача

```http
GET /users/:userId
```

Приклад:

```text
http://localhost:3000/users/1
```

Для сторінки використовується шаблон:

```text
views/users/details.pug
```

---

## Маршрути статей

### Список статей

```http
GET /articles
```

Приклад:

```text
http://localhost:3000/articles
```

Для сторінки використовується шаблон:

```text
views/articles/index.ejs
```

### Інформація про статтю

```http
GET /articles/:articleId
```

Приклад:

```text
http://localhost:3000/articles/1
```

Для сторінки використовується шаблон:

```text
views/articles/details.ejs
```

---

## PUG

PUG використовується для відображення користувачів.

Приклад `index.pug`:

```pug
doctype html
html(lang="uk")
  head
    meta(charset="UTF-8")
    title Список користувачів

  body
    h1 Список користувачів

    ul
      each user in users
        li
          a(href='/users/' + user.id)= user.name
          |  — #{user.email}
```

---

## EJS

EJS використовується для відображення статей.

Приклад `index.ejs`:

```html
<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <title>Статті</title>
  </head>
  <body>
    <h1>Список статей</h1>

    <ul>
      <% articles.forEach(article => { %>
      <li>
        <a href="/articles/<%= article.id %>"> <%= article.title %> </a>
        — <%= article.author %>
      </li>
      <% }) %>
    </ul>
  </body>
</html>
```

---

## Контролери

У контролерах для відображення HTML використовується метод:

```js
res.render();
```

Для PUG:

```js
res.render('users/index.pug', {
  users,
});
```

Для EJS:

```js
res.render('articles/index.ejs', {
  articles,
});
```

---

## Валідація ID

Для маршрутів із параметрами:

```text
/users/:userId
/articles/:articleId
```

використовується middleware для перевірки, що ID містить тільки цифри.

При неправильному ID сервер повертає:

```text
400 Invalid user ID
```

або:

```text
400 Invalid article ID
```

---

## Авторизація

У проєкті присутній `authMiddleware`.

Для захищених маршрутів необхідно передати HTTP-заголовок:

```text
Authorization: Bearer valid-token
```

Без токена сервер повертає:

```text
401 Authentication required
```

Якщо GET-сторінки потрібно відкривати без авторизації у звичайному браузері, `authMiddleware` можна прибрати з GET-маршрутів `/users`, `/users/:userId`, `/articles` та `/articles/:articleId`.

---

## Обробка помилок

У проєкті реалізовані middleware для:

- помилки `404 Route not found`;
- внутрішньої помилки сервера `500 Internal server error`;
- перевірки авторизації;
- перевірки ID;
- логування HTTP-запитів;
- роботи із сесіями.

---

## Результат

Проєкт демонструє одночасне використання двох шаблонізаторів у Express.js:

| Маршрут                | Шаблонізатор |
| ---------------------- | ------------ |
| `/users`               | PUG          |
| `/users/:userId`       | PUG          |
| `/articles`            | EJS          |
| `/articles/:articleId` | EJS          |
