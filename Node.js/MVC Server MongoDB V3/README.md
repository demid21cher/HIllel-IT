# MVC Server — MongoDB Atlas

## Опис проєкту

Навчальний проєкт на **Node.js + Express.js + MongoDB Atlas**, побудований за принципами MVC-архітектури.

У проєкті реалізовано:

- підключення до MongoDB Atlas;
- роботу з колекцією `users`;
- читання даних;
- projection під час читання;
- створення одного та декількох документів;
- оновлення одного та декількох документів;
- повну заміну документа;
- видалення одного та декількох документів;
- використання MongoDB cursor для послідовної обробки документів;
- використання aggregation pipeline для отримання статистики;
- авторизацію користувачів через Passport.js та сесії.

---

# Технології

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Passport.js
- passport-local
- express-session
- bcryptjs
- Thunder Client

---

# Структура роботи з MongoDB

Основна модель:

```text
MongoUser
```

Модель працює з колекцією:

```text
users
```

Документ має структуру:

```json
{
  "_id": "ObjectId",
  "name": "User name",
  "email": "user@gmail.com",
  "age": 25
}
```

---

# Запуск проєкту

Встановлення залежностей:

```bash
npm install
```

Запуск сервера:

```bash
node server.js
```

Після запуску сервер доступний за адресою:

```text
http://localhost:3000
```

---

# MongoDB CRUD Operations

## 1. Читання даних

### GET `/database`

Маршрут використовується для отримання користувачів.

MongoDB метод:

```javascript
find();
```

Для читання використовується projection, тому повертаються необхідні поля:

- `name`
- `email`
- `age`

Запит:

```text
GET http://localhost:3000/database
```

Приклад відповіді:

```json
[
  {
    "name": "Anna",
    "email": "anna@gmail.com",
    "age": 22
  },
  {
    "name": "Oleh",
    "email": "oleh@gmail.com",
    "age": 30
  }
]
```

---

# CREATE

## 2. Додавання одного документа

### POST `/database/create`

Використовується для створення одного користувача.

MongoDB операція:

```javascript
insertOne();
```

Приклад запиту:

```text
POST http://localhost:3000/database/create
```

Body → JSON:

```json
{
  "name": "Ivan",
  "email": "ivan@gmail.com",
  "age": 25
}
```

У результаті до колекції `users` додається один документ.

---

## 3. Додавання декількох документів

### POST `/database/create-many`

Використовується для одночасного додавання декількох користувачів.

MongoDB операція:

```javascript
insertMany();
```

Приклад:

```text
POST http://localhost:3000/database/create-many
```

Body:

```json
[
  {
    "name": "Anna",
    "email": "anna@gmail.com",
    "age": 22
  },
  {
    "name": "Oleh",
    "email": "oleh@gmail.com",
    "age": 30
  }
]
```

---

# UPDATE

## 4. Оновлення одного документа

### PUT `/database/update/:id`

MongoDB операція:

```javascript
updateOne();
```

`id` передається через URL.

Приклад:

```text
PUT http://localhost:3000/database/update/6ab120f4a8f870cd21d494c6
```

Body:

```json
{
  "age": 26
}
```

Оновлюється тільки зазначене поле.

---

## 5. Оновлення декількох документів

### PUT `/database/update-many`

MongoDB операція:

```javascript
updateMany();
```

Body:

```json
{
  "filter": {
    "age": 20
  },
  "update": {
    "age": 21
  }
}
```

Усі документи, які відповідають умові `age: 20`, отримають нове значення `age: 21`.

---

## 6. Повна заміна документа

### PUT `/database/replace/:id`

MongoDB операція:

```javascript
replaceOne();
```

Приклад:

```text
PUT http://localhost:3000/database/replace/USER_ID
```

Body:

```json
{
  "name": "New User",
  "email": "new@gmail.com",
  "age": 18
}
```

На відміну від `updateOne()`, метод `replaceOne()` повністю замінює документ.

---

# DELETE

## 7. Видалення одного документа

### DELETE `/database/delete/:id`

MongoDB операція:

```javascript
deleteOne();
```

Приклад:

```text
DELETE http://localhost:3000/database/delete/6ab120f4a8f870cd21d494c6
```

Видаляється документ із відповідним `_id`.

Приклад відповіді:

```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

---

## 8. Видалення декількох документів

### DELETE `/database/delete-many`

MongoDB операція:

```javascript
deleteMany();
```

Body:

```json
{
  "age": 18
}
```

Будуть видалені всі документи, які відповідають заданій умові.

---

# Cursor

## 9. Отримання даних за допомогою Cursor

### GET `/database/cursor`

Для роботи з великим обсягом документів використовується MongoDB cursor.

Маршрут:

```text
GET http://localhost:3000/database/cursor
```

Основна операція:

```javascript
MongoUser.find().cursor();
```

Замість завантаження всіх документів у масив:

```javascript
const users = await MongoUser.find();
```

створюється курсор:

```javascript
const cursor = MongoUser.find().cursor();
```

Після цього документи обробляються послідовно:

```javascript
for await (const user of cursor) {
    ...
}
```

Це дозволяє обробляти документи поступово та не створювати в пам'яті масив, який містить усю колекцію.

### Приклад запиту в Thunder Client

Method:

```text
GET
```

URL:

```text
http://localhost:3000/database/cursor
```

### Приклад результату

```text
{"_id":"...","name":"Anna","email":"anna@gmail.com","age":22}
{"_id":"...","name":"Oleh","email":"oleh@gmail.com","age":30}
{"_id":"...","name":"Ivan","email":"ivan@gmail.com","age":25}
```

Кожен документ передається окремим рядком.

### Технічна реалізація

```javascript
const cursor = MongoUser.find().cursor();

res.setHeader('Content-Type', 'application/x-ndjson');

for await (const user of cursor) {
  res.write(JSON.stringify(user) + '\n');
}

res.end();
```

Використання `for await...of` дозволяє отримувати документи з курсора послідовно.

---

# Aggregation

## 10. Отримання статистики

### GET `/database/statistics`

Для отримання статистичних даних використовується MongoDB aggregation pipeline.

Запит:

```text
GET http://localhost:3000/database/statistics
```

Основний метод MongoDB:

```javascript
aggregate();
```

Aggregation використовується для розрахунку:

- загальної кількості користувачів;
- середнього віку;
- суми значень віку;
- мінімального віку;
- максимального віку;
- кількості унікальних email.

---

## Логіка Aggregation

Для групування документів використовується:

```javascript
$group;
```

Приклад:

```javascript
{
  $group: {
    _id: null,
    totalUsers: { $sum: 1 },
    averageAge: { $avg: '$age' },
    totalAge: { $sum: '$age' },
    minAge: { $min: '$age' },
    maxAge: { $max: '$age' },
    uniqueEmails: { $addToSet: '$email' }
  }
}
```

Після цього використовується:

```javascript
$project;
```

для формування кінцевого результату.

Кількість унікальних email визначається за допомогою:

```javascript
$size;
```

---

## Приклад відповіді

Якщо в базі знаходиться 5 користувачів, результат може мати вигляд:

```json
[
  {
    "totalUsers": 5,
    "averageAge": 27.4,
    "totalAge": 137,
    "minAge": 20,
    "maxAge": 35,
    "uniqueEmailsCount": 5
  }
]
```

### Значення полів

| Поле                | Значення                        |
| ------------------- | ------------------------------- |
| `totalUsers`        | загальна кількість користувачів |
| `averageAge`        | середній вік                    |
| `totalAge`          | сума віку всіх користувачів     |
| `minAge`            | мінімальний вік                 |
| `maxAge`            | максимальний вік                |
| `uniqueEmailsCount` | кількість унікальних email      |

---

# Перевірка через Thunder Client

Для перевірки роботи нової функціональності використовується **Thunder Client** у Visual Studio Code.

## 1. Запуск сервера

```bash
node server.js
```

---

## 2. Перевірка Cursor

Method:

```text
GET
```

URL:

```text
http://localhost:3000/database/cursor
```

Натиснути:

```text
Send
```

Очікується отримання документів користувачів послідовно.

---

## 3. Перевірка Aggregation

Method:

```text
GET
```

URL:

```text
http://localhost:3000/database/statistics
```

Натиснути:

```text
Send
```

Очікується JSON зі статистичними даними:

```json
[
  {
    "totalUsers": 5,
    "averageAge": 27.4,
    "totalAge": 137,
    "minAge": 20,
    "maxAge": 35,
    "uniqueEmailsCount": 5
  }
]
```

Фактичні значення залежать від даних, які знаходяться в MongoDB Atlas.

---

# Повний список Database Routes

| Метод  | Маршрут                 | Призначення                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/database`             | читання даних + projection |
| GET    | `/database/cursor`      | читання даних через cursor |
| GET    | `/database/statistics`  | aggregation та статистика  |
| POST   | `/database/create`      | insertOne                  |
| POST   | `/database/create-many` | insertMany                 |
| PUT    | `/database/update/:id`  | updateOne                  |
| PUT    | `/database/update-many` | updateMany                 |
| PUT    | `/database/replace/:id` | replaceOne                 |
| DELETE | `/database/delete/:id`  | deleteOne                  |
| DELETE | `/database/delete-many` | deleteMany                 |

---

# Висновок

У проєкті реалізовано роботу з MongoDB Atlas через Express.js.

У рамках CRUD реалізовано:

### Create

- `insertOne`
- `insertMany`

### Read

- `find`
- `projection`

### Update

- `updateOne`
- `updateMany`
- `replaceOne`

### Delete

- `deleteOne`
- `deleteMany`

У рамках нового завдання додано:

### Cursor

Використовується:

```javascript
MongoUser.find().cursor();
```

для послідовного перебору документів без створення великого масиву в пам'яті.

### Aggregation

Використовується:

```javascript
MongoUser.aggregate();
```

для отримання статистики за допомогою `$group`, `$project`, `$sum`, `$avg`, `$min`, `$max`, `$addToSet` та `$size`.

Таким чином, проєкт демонструє основні способи роботи з даними MongoDB через Express.js та Mongoose, включаючи CRUD-операції, курсори та агрегаційні запити.
