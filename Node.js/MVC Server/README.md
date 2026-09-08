Так. Нижче — повний готовий `README.md`, який можна **цілком скопіювати у файл `README.md`** для цього проєкту.

# Express MVC Server

Навчальний HTTP-сервер, розроблений з використанням **Node.js** та **Express.js**.

Проєкт реалізує маршрути для головної сторінки, користувачів та статей. Для організації коду використовується **MVC-архітектура**, а для покращення обробки та безпеки запитів застосовуються middleware для логування, аутентифікації, валідації, управління сесіями, перевірки прав доступу та обробки помилок.

---

## Зміст

- [Технології](#технології)
- [Вимоги](#вимоги)
- [Встановлення](#встановлення)
- [Запуск сервера](#запуск-сервера)
- [Структура проєкту](#структура-проєкту)
- [MVC архітектура](#mvc-архітектура)
- [Middleware](#middleware)
- [Маршрути API](#маршрути-api)
- [Перевірка через Thunder Client](#перевірка-через-thunder-client)
- [Повний список маршрутів](#повний-список-маршрутів)
- [Обробка помилок](#обробка-помилок)
- [Формат відповідей](#формат-відповідей)
- [Порт сервера](#порт-сервера)
- [Git](#git)

---

## Технології

У проєкті використовуються:

- **Node.js** — середовище виконання JavaScript;
- **Express.js** — framework для створення HTTP-сервера;
- **Express Session** — управління HTTP-сесіями;
- **npm** — менеджер пакетів;
- **JavaScript ES Modules** — модульна система JavaScript;
- **Thunder Client** — інструмент для тестування API у Visual Studio Code.

---

## Вимоги

Перед запуском проєкту необхідно встановити:

- Node.js 18 або новішої версії;
- npm;
- Visual Studio Code;
- Thunder Client — для тестування API.

Перевірити встановлені версії Node.js та npm:

```bash
node -v
npm -v
```

---

## Встановлення

Клонувати Git-репозиторій:

```bash
git clone <URL_ВАШОГО_РЕПОЗИТОРІЮ>
```

Перейти до папки проєкту:

```bash
cd <НАЗВА_ПРОЄКТУ>
```

Встановити всі залежності:

```bash
npm install
```

Після цього в проєкті буде створено папку:

```text
node_modules/
```

---

## Запуск сервера

Для запуску сервера використовується команда:

```bash
npm start
```

Також доступний режим розробки з автоматичним перезапуском:

```bash
npm run dev
```

Після успішного запуску сервер буде доступний за адресою:

```text
http://localhost:3000
```

У терміналі буде виведено:

```text
Сервер запущено за адресою http://localhost:3000
```

---

## Структура проєкту

```text
project/
├── src/
│   ├── controllers/
│   │   ├── articleController.js
│   │   ├── rootController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── articleAccessMiddleware.js
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── loggerMiddleware.js
│   │   ├── sessionMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── routes/
│   │   ├── articleRoutes.js
│   │   ├── rootRoutes.js
│   │   └── userRoutes.js
│   │
│   └── server.js
│
├── package.json
├── package-lock.json
└── README.md
```

---

# MVC архітектура

Проєкт використовує паттерн **MVC (Model-View-Controller)**.

## Controllers

Контролери відповідають за логіку обробки HTTP-запитів та формування відповідей.

У проєкті використовуються:

```text
src/controllers/rootController.js
src/controllers/userController.js
src/controllers/articleController.js
```

### `rootController.js`

Містить обробник головного маршруту:

```text
GET /
```

### `userController.js`

Містить обробники маршрутів користувачів:

```text
GET /users
POST /users
GET /users/:userId
PUT /users/:userId
DELETE /users/:userId
```

### `articleController.js`

Містить обробники маршрутів статей:

```text
GET /articles
POST /articles
GET /articles/:articleId
PUT /articles/:articleId
DELETE /articles/:articleId
```

## Routes

Routes відповідають за визначення URL, HTTP-методу та послідовності виконання middleware.

Файли:

```text
src/routes/rootRoutes.js
src/routes/userRoutes.js
src/routes/articleRoutes.js
```

## Models

У поточній версії окремі моделі бази даних не використовуються, оскільки сервер не підключений до бази даних.

Директорія моделей може бути додана в майбутньому для роботи з MongoDB, PostgreSQL, MySQL або іншою базою даних.

---

# Middleware

У проєкті реалізовані middleware для різних етапів обробки HTTP-запитів.

## Logger Middleware

Файл:

```text
src/middleware/loggerMiddleware.js
```

Middleware використовується для логування HTTP-запитів.

Він записує:

- дату та час запиту;
- HTTP-метод;
- URL;
- HTTP status code;
- час виконання запиту.

Приклад запису в консолі:

```text
[2026-09-08T16:30:00.000Z] GET / - 200 - 2ms
```

Для маршруту `/` middleware логування підключений безпосередньо до маршруту.

---

## Authentication Middleware

Файл:

```text
src/middleware/authMiddleware.js
```

Middleware відповідає за перевірку авторизації користувача.

Для тестування використовується демонстраційний HTTP-заголовок:

```text
Authorization: Bearer valid-token
```

Приклад заголовка:

```text
Authorization: Bearer valid-token
```

Якщо заголовок відсутній, сервер повертає:

```text
401 Unauthorized
```

та:

```text
Authentication required
```

Якщо токен неправильний:

```text
401 Unauthorized
```

та:

```text
Invalid authentication token
```

> Використаний токен `valid-token` є демонстраційним і призначений тільки для навчального проєкту. У production-застосунку необхідно використовувати повноцінну систему аутентифікації.

---

## Validation Middleware

Файл:

```text
src/middleware/validationMiddleware.js
```

Middleware перевіряє параметри:

```text
userId
articleId
```

ID повинен складатися тільки з цифр.

Коректні приклади:

```text
/users/123
/articles/456
```

Некоректні приклади:

```text
/users/abc
/articles/test
```

При некоректному `userId` сервер повертає:

```text
400 Bad Request

Invalid user ID
```

При некоректному `articleId`:

```text
400 Bad Request

Invalid article ID
```

---

## Session Middleware

Файл:

```text
src/middleware/sessionMiddleware.js
```

Для управління HTTP-сесіями використовується пакет:

```text
express-session
```

Основні налаштування:

- `secret` — секретний ключ для підпису сесії;
- `resave: false` — не зберігати сесію повторно без змін;
- `saveUninitialized: false` — не створювати порожні сесії;
- `maxAge` — час життя cookie.

Поточна конфігурація призначена для навчального проєкту.

Для production необхідно:

- зберігати `secret` у змінних середовища;
- використовувати захищені cookie;
- використовувати окреме сховище сесій.

---

## Article Access Middleware

Файл:

```text
src/middleware/articleAccessMiddleware.js
```

Middleware відповідає за перевірку прав доступу до статей.

Перед доступом до статті перевіряється наявність авторизованого користувача.

Для демонстрації забороненого доступу використовується:

```text
/articles/0
```

При запиті до цього ресурсу сервер повертає:

```text
403 Forbidden

Access denied to this article
```

У реальному застосунку перевірка прав доступу повинна виконуватися на основі даних користувача та статті, отриманих із бази даних.

---

## Error Middleware

Файл:

```text
src/middleware/errorMiddleware.js
```

Містить middleware для:

- обробки неіснуючих маршрутів;
- централізованої обробки помилок сервера.

Неіснуючий маршрут:

```text
404 Not Found

Route not found
```

Внутрішня помилка сервера:

```text
500 Internal Server Error

Internal server error
```

Усі відповіді залишаються текстовими.

---

# Маршрути API

## Root

### GET `/`

Головний маршрут сервера.

Middleware:

```text
loggerMiddleware
```

Запит:

```text
GET http://localhost:3000/
```

Відповідь:

```text
Get root route
```

Очікуваний статус:

```text
200 OK
```

---

# Users

## GET `/users`

Отримання списку користувачів.

Middleware:

```text
authMiddleware
```

Запит:

```text
GET http://localhost:3000/users
```

Без авторизації:

```text
401 Unauthorized
```

З авторизацією:

```text
200 OK
```

Відповідь:

```text
Get users route
```

---

## POST `/users`

Створення користувача.

Middleware:

```text
authMiddleware
```

Запит:

```text
POST http://localhost:3000/users
```

Необхідний заголовок:

```text
Authorization: Bearer valid-token
```

Відповідь:

```text
Post users route
```

---

## GET `/users/:userId`

Отримання користувача за ID.

Middleware:

```text
authMiddleware
validateUserId
```

Приклад:

```text
GET http://localhost:3000/users/123
```

Відповідь:

```text
Get user with ID: 123
```

---

## PUT `/users/:userId`

Оновлення користувача.

Middleware:

```text
authMiddleware
validateUserId
```

Приклад:

```text
PUT http://localhost:3000/users/123
```

Відповідь:

```text
Update user with ID: 123
```

---

## DELETE `/users/:userId`

Видалення користувача.

Middleware:

```text
authMiddleware
validateUserId
```

Приклад:

```text
DELETE http://localhost:3000/users/123
```

Відповідь:

```text
Delete user with ID: 123
```

---

# Articles

## GET `/articles`

Отримання списку статей.

Middleware:

```text
authMiddleware
articleAccessMiddleware
```

Запит:

```text
GET http://localhost:3000/articles
```

Необхідний заголовок:

```text
Authorization: Bearer valid-token
```

Відповідь:

```text
Get articles route
```

---

## POST `/articles`

Створення статті.

Middleware:

```text
authMiddleware
articleAccessMiddleware
```

Запит:

```text
POST http://localhost:3000/articles
```

Необхідний заголовок:

```text
Authorization: Bearer valid-token
```

Відповідь:

```text
Post articles route
```

---

## GET `/articles/:articleId`

Отримання статті за ID.

Middleware:

```text
authMiddleware
validateArticleId
articleAccessMiddleware
```

Приклад:

```text
GET http://localhost:3000/articles/123
```

Відповідь:

```text
Get article with ID: 123
```

---

## PUT `/articles/:articleId`

Оновлення статті.

Middleware:

```text
authMiddleware
validateArticleId
articleAccessMiddleware
```

Приклад:

```text
PUT http://localhost:3000/articles/123
```

Відповідь:

```text
Update article with ID: 123
```

---

## DELETE `/articles/:articleId`

Видалення статті.

Middleware:

```text
authMiddleware
validateArticleId
articleAccessMiddleware
```

Приклад:

```text
DELETE http://localhost:3000/articles/123
```

Відповідь:

```text
Delete article with ID: 123
```

---

# Перевірка через Thunder Client

Для тестування API можна використовувати розширення **Thunder Client** у Visual Studio Code.

Спочатку необхідно запустити сервер:

```bash
npm start
```

Після цього створити запити в Thunder Client.

Базова URL:

```text
http://localhost:3000
```

## Авторизація

Для захищених маршрутів у Thunder Client потрібно відкрити вкладку:

```text
Headers
```

та додати:

| Name          | Value              |
| ------------- | ------------------ |
| Authorization | Bearer valid-token |

---

## Тест 1 — Root

Method:

```text
GET
```

URL:

```text
http://localhost:3000/
```

Очікуваний статус:

```text
200 OK
```

Response:

```text
Get root route
```

---

## Тест 2 — Users без авторизації

Method:

```text
GET
```

URL:

```text
http://localhost:3000/users
```

Без Header `Authorization`.

Очікувано:

```text
401 Unauthorized
```

Response:

```text
Authentication required
```

Цей тест демонструє роботу `authMiddleware`.

---

## Тест 3 — Users з авторизацією

Method:

```text
GET
```

URL:

```text
http://localhost:3000/users
```

Header:

```text
Authorization: Bearer valid-token
```

Очікувано:

```text
200 OK
```

Response:

```text
Get users route
```

---

## Тест 4 — User ID

Method:

```text
GET
```

URL:

```text
http://localhost:3000/users/123
```

Header:

```text
Authorization: Bearer valid-token
```

Очікувано:

```text
200 OK
```

Response:

```text
Get user with ID: 123
```

---

## Тест 5 — Некоректний User ID

Method:

```text
GET
```

URL:

```text
http://localhost:3000/users/abc
```

Header:

```text
Authorization: Bearer valid-token
```

Очікувано:

```text
400 Bad Request
```

Response:

```text
Invalid user ID
```

Цей тест демонструє роботу `validateUserId`.

---

## Тест 6 — Articles

Method:

```text
GET
```

URL:

```text
http://localhost:3000/articles
```

Header:

```text
Authorization: Bearer valid-token
```

Очікувано:

```text
200 OK
```

Response:

```text
Get articles route
```

---

## Тест 7 — Article ID

Method:

```text
GET
```

URL:

```text
http://localhost:3000/articles/123
```

Header:

```text
Authorization: Bearer valid-token
```

Очікувано:

```text
200 OK
```

Response:

```text
Get article with ID: 123
```

---

## Тест 8 — Некоректний Article ID

Method:

```text
GET
```

URL:

```text
http://localhost:3000/articles/abc
```

Header:

```text
Authorization: Bearer valid-token
```

Очікувано:

```text
400 Bad Request
```

Response:

```text
Invalid article ID
```

Цей тест демонструє роботу `validateArticleId`.

---

## Тест 9 — Заборонений доступ до статті

Method:

```text
GET
```

URL:

```text
http://localhost:3000/articles/0
```

Header:

```text
Authorization: Bearer valid-token
```

Очікувано:

```text
403 Forbidden
```

Response:

```text
Access denied to this article
```

Цей тест демонструє роботу `articleAccessMiddleware`.

---

# Повний список маршрутів

|   № | Метод  | URL                    | Middleware                           |                Статус |
| --: | ------ | ---------------------- | ------------------------------------ | --------------------: |
|   1 | GET    | `/`                    | Logger                               |                   200 |
|   2 | GET    | `/users`               | Authentication                       |             200 / 401 |
|   3 | POST   | `/users`               | Authentication                       |             200 / 401 |
|   4 | GET    | `/users/:userId`       | Authentication + Validation          |       200 / 400 / 401 |
|   5 | PUT    | `/users/:userId`       | Authentication + Validation          |       200 / 400 / 401 |
|   6 | DELETE | `/users/:userId`       | Authentication + Validation          |       200 / 400 / 401 |
|   7 | GET    | `/articles`            | Authentication + Access              |             200 / 401 |
|   8 | POST   | `/articles`            | Authentication + Access              |             200 / 401 |
|   9 | GET    | `/articles/:articleId` | Authentication + Validation + Access | 200 / 400 / 401 / 403 |
|  10 | PUT    | `/articles/:articleId` | Authentication + Validation + Access | 200 / 400 / 401 / 403 |
|  11 | DELETE | `/articles/:articleId` | Authentication + Validation + Access | 200 / 400 / 401 / 403 |

---

# Обробка помилок

Сервер використовує HTTP status codes для позначення результату запиту.

### `200 OK`

Запит виконано успішно.

### `400 Bad Request`

Передані некоректні параметри.

Наприклад:

```text
/users/abc
```

або:

```text
/articles/abc
```

### `401 Unauthorized`

Користувач не пройшов аутентифікацію.

Наприклад, відсутній:

```text
Authorization: Bearer valid-token
```

### `403 Forbidden`

Користувач авторизований, але не має доступу до ресурсу.

Приклад:

```text
/articles/0
```

### `404 Not Found`

Запитаний маршрут не існує.

### `500 Internal Server Error`

Внутрішня помилка сервера.

---

# Формат відповідей

Відповіді сервера залишаються **текстовими**, відповідно до вимог завдання.

Для формування відповіді використовується:

```javascript
res.type('text').send(...)
```

Приклад:

```javascript
res.type('text').send('Get users route');
```

Сервер не використовує JSON-відповіді в поточній версії.

---

# Послідовність обробки запиту

Для захищеного маршруту користувача:

```text
HTTP Request
      ↓
Session Middleware
      ↓
User Route
      ↓
Authentication Middleware
      ↓
Validation Middleware
      ↓
User Controller
      ↓
Text Response
```

Для маршруту статті:

```text
HTTP Request
      ↓
Session Middleware
      ↓
Article Route
      ↓
Authentication Middleware
      ↓
Validation Middleware
      ↓
Article Access Middleware
      ↓
Article Controller
      ↓
Text Response
```

Для головного маршруту:

```text
HTTP Request
      ↓
Logger Middleware
      ↓
Root Controller
      ↓
Text Response
```

---

# Порт сервера

Сервер працює на порту:

```text
3000
```

У `src/server.js`:

```javascript
const port = 3000;
```

Адреса сервера:

```text
http://localhost:3000
```

---

# npm scripts

У `package.json` доступні такі команди:

### Запуск

```bash
npm start
```

### Режим розробки

```bash
npm run dev
```

Режим `dev` використовує можливість Node.js автоматично перезапускати сервер після зміни файлів.

---

# Git

Для створення Git-репозиторію:

```bash
git init
```

Додати файли:

```bash
git add .
```

Створити commit:

```bash
git commit -m "Add Express MVC middleware"
```

Перейменувати основну гілку:

```bash
git branch -M main
```

Додати віддалений репозиторій:

```bash
git remote add origin <URL_ВАШОГО_РЕПОЗИТОРІЮ>
```

Відправити проєкт:

```bash
git push -u origin main
```

Після цього посилання на Git-репозиторій можна надати для перевірки.

---

# Результат

У результаті реалізовано:

- Node.js;
- Express.js;
- MVC-архітектуру;
- окремі controllers;
- окремі routes;
- middleware логування;
- middleware аутентифікації;
- middleware валідації;
- middleware перевірки прав доступу до статей;
- middleware управління сесіями;
- централізовану обробку помилок;
- текстові відповіді сервера;
- усі початкові маршрути користувачів та статей;
- порт `3000`;
- тестування API через Thunder Client;
- можливість подальшого підключення бази даних через Models.
