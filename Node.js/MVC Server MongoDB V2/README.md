# MongoDB CRUD Operations

## Опис

У проєкті реалізована робота з MongoDB Atlas через Express.js. Додано
CRUD операції:

- створення документів;
- читання даних з projection;
- оновлення документів;
- заміна документа;
- видалення документів.

## Database Routes

Базова адреса:

    http://localhost:3000/database

## READ

### GET /database

MongoDB method:

    find() + projection

Отримання користувачів з полями: - name - email - age

## CREATE

### POST /database/create

MongoDB method:

    insertOne()

Body:

```json
{
  "name": "Ivan",
  "email": "ivan@gmail.com",
  "age": 25
}
```

### POST /database/create-many

MongoDB method:

    insertMany()

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

## UPDATE

### PUT /database/update/:id

MongoDB method:

    updateOne()

Оновлює один документ.

### PUT /database/update-many

MongoDB method:

    updateMany()

Оновлює багато документів за умовою.

### PUT /database/replace/:id

MongoDB method:

    replaceOne()

Повністю замінює документ.

## DELETE

### DELETE /database/delete/:id

MongoDB method:

    deleteOne()

Видаляє один документ.

### DELETE /database/delete-many

MongoDB method:

    deleteMany()

Видаляє декілька документів.

## Перевірка через Thunder Client

Запуск:

    node server.js

Перед CRUD необхідно виконати:

    POST /auth/register
    POST /auth/login

Після авторизації можна перевіряти:

    GET /database
    POST /database/create
    POST /database/create-many
    PUT /database/update/:id
    PUT /database/update-many
    PUT /database/replace/:id
    DELETE /database/delete/:id
    DELETE /database/delete-many

## Висновок

Реалізовано повний CRUD функціонал MongoDB:

Create: - insertOne - insertMany

Read: - find - projection

Update: - updateOne - updateMany - replaceOne

Delete: - deleteOne - deleteMany
