# Express Server

Навчальний HTTP-сервер, розроблений з використанням **Node.js** та **Express.js**.

Сервер реалізує маршрути для головної сторінки, користувачів та статей. Усі відповіді сервера повертаються у текстовому форматі.

## Технології

- Node.js
- Express.js
- npm
- JavaScript (ES Modules)

## Вимоги

Перед початком роботи необхідно встановити:

- Node.js
- npm

Перевірити встановлені версії можна командами:

```bash
node -v
npm -v
```

## Встановлення

Клонувати репозиторій:

```bash
git clone <URL_ВАШОГО_РЕПОЗИТОРІЮ>
```

Перейти до директорії проєкту:

```bash
cd <НАЗВА_ПРОЄКТУ>
```

Встановити залежності:

```bash
npm install
```

## Запуск сервера

Запустити сервер командою:

```bash
node server.js
```

Після запуску сервер буде доступний за адресою:

```text
http://localhost:3000
```

У консолі з'явиться повідомлення:

```text
Сервер запущено за адресою http://localhost:3000
```

## Маршрути

### Головний маршрут

**GET `/`**

Повертає:

```text
Get root route
```

Приклад:

```bash
curl http://localhost:3000/
```

---

## Користувачі

### Отримати список користувачів

**GET `/users`**

Повертає:

```text
Get users route
```

Приклад:

```bash
curl http://localhost:3000/users
```

### Створити користувача

**POST `/users`**

Повертає:

```text
Post users route
```

Приклад:

```bash
curl -X POST http://localhost:3000/users
```

### Отримати користувача за ID

**GET `/users/:userId`**

Параметр:

- `userId` — ідентифікатор користувача.

Наприклад, для запиту:

```text
GET /users/123
```

сервер поверне:

```text
Get user with ID: 123
```

Приклад:

```bash
curl http://localhost:3000/users/123
```

### Оновити користувача

**PUT `/users/:userId`**

Наприклад:

```text
PUT /users/123
```

сервер поверне:

```text
Update user with ID: 123
```

Приклад:

```bash
curl -X PUT http://localhost:3000/users/123
```

### Видалити користувача

**DELETE `/users/:userId`**

Наприклад:

```text
DELETE /users/123
```

сервер поверне:

```text
Delete user with ID: 123
```

Приклад:

```bash
curl -X DELETE http://localhost:3000/users/123
```

---

## Статті

### Отримати список статей

**GET `/articles`**

Повертає:

```text
Get articles route
```

Приклад:

```bash
curl http://localhost:3000/articles
```

### Створити статтю

**POST `/articles`**

Повертає:

```text
Post articles route
```

Приклад:

```bash
curl -X POST http://localhost:3000/articles
```

### Отримати статтю за ID

**GET `/articles/:articleId`**

Параметр:

- `articleId` — ідентифікатор статті.

Наприклад:

```text
GET /articles/456
```

поверне:

```text
Get article with ID: 456
```

Приклад:

```bash
curl http://localhost:3000/articles/456
```

### Оновити статтю

**PUT `/articles/:articleId`**

Наприклад:

```text
PUT /articles/456
```

поверне:

```text
Update article with ID: 456
```

Приклад:

```bash
curl -X PUT http://localhost:3000/articles/456
```

### Видалити статтю

**DELETE `/articles/:articleId`**

Наприклад:

```text
DELETE /articles/456
```

поверне:

```text
Delete article with ID: 456
```

Приклад:

```bash
curl -X DELETE http://localhost:3000/articles/456
```

---

## Повний список маршрутів

| Метод  | Маршрут                | Результат                             |
| ------ | ---------------------- | ------------------------------------- |
| GET    | `/`                    | `Get root route`                      |
| GET    | `/users`               | `Get users route`                     |
| POST   | `/users`               | `Post users route`                    |
| GET    | `/users/:userId`       | `Get user with ID: {userId}`          |
| PUT    | `/users/:userId`       | `Update user with ID: {userId}`       |
| DELETE | `/users/:userId`       | `Delete user with ID: {userId}`       |
| GET    | `/articles`            | `Get articles route`                  |
| POST   | `/articles`            | `Post articles route`                 |
| GET    | `/articles/:articleId` | `Get article with ID: {articleId}`    |
| PUT    | `/articles/:articleId` | `Update article with ID: {articleId}` |
| DELETE | `/articles/:articleId` | `Delete article with ID: {articleId}` |

## Структура проєкту

Якщо весь наведений код знаходиться у файлі `server.js`, структура може виглядати так:

```text
project/
├── node_modules/
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Express

У проєкті використовується Express для створення HTTP-сервера та обробки HTTP-запитів.

Основні HTTP-методи:

- `GET` — отримання даних;
- `POST` — створення даних;
- `PUT` — оновлення даних;
- `DELETE` — видалення даних.

Параметри `userId` та `articleId` отримуються через:

```javascript
req.params;
```

Наприклад:

```javascript
const userId = req.params.userId;
```

## Порт

Сервер працює на порту:

```text
3000
```

Основна адреса:

```text
http://localhost:3000
```

## Git

Для публікації проєкту в Git-репозиторії:

```bash
git init
git add .
git commit -m "Create Express server"
git branch -M main
git remote add origin <URL_ВАШОГО_РЕПОЗИТОРІЮ>
git push -u origin main
```

Після публікації посилання на Git-репозиторій можна надати для перевірки.
