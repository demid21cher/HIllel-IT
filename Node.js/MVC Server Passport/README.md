# MVC Server — Passport Authentication

Навчальний проєкт на **Node.js + Express.js**, у якому реалізована авторизація користувачів за допомогою **Passport.js**, локальної стратегії `passport-local` та серверних сесій `express-session`.

## Технології

- Node.js
- Express.js
- Passport.js
- passport-local
- express-session
- bcryptjs
- cookie-parser
- PUG
- EJS

## Що реалізовано

У проєкті реалізовано:

- реєстрацію користувача;
- авторизацію за `email` та `password`;
- перевірку пароля через `bcryptjs`;
- Passport Local Strategy;
- створення login-сесії;
- `serializeUser`;
- `deserializeUser`;
- збереження ID сесії у cookie;
- `httpOnly` cookie;
- `secure` cookie для production;
- вихід із системи;
- захищений маршрут `/protected`;
- middleware для перевірки авторизації.

## Встановлення

```bash
npm install
```

Якщо Passport ще не встановлений:

```bash
npm install passport passport-local bcryptjs express-session
```

## Структура проєкту

```text
project/
├── config/
│   └── passport.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── articleController.js
│   └── ...
├── middleware/
│   ├── authMiddleware.js
│   ├── sessionMiddleware.js
│   └── ...
├── routes/
│   ├── authRoutes.js
│   ├── protectedRoutes.js
│   ├── userRoutes.js
│   ├── articleRoutes.js
│   └── ...
├── public/
├── views/
├── server.js
└── README.md
```

## Passport Local Strategy

Для входу використовується локальна стратегія Passport.

```js
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = users.find((user) => user.email === email);

        if (!user) {
          return done(null, false, {
            message: 'Invalid email or password',
          });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return done(null, false, {
            message: 'Invalid email or password',
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
```

## Serialize та Deserialize

Після успішного входу Passport викликає:

```js
passport.serializeUser((user, done) => {
  done(null, user.id);
});
```

У сесію записується ID користувача.

```text
user
 ↓
serializeUser()
 ↓
user.id
 ↓
session
```

Під час наступного запиту Passport викликає:

```js
passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);

  if (!user) {
    return done(null, false);
  }

  done(null, user);
});
```

```text
session
 ↓
user.id
 ↓
deserializeUser()
 ↓
user
 ↓
req.user
```

## Express Session

Приклад `sessionMiddleware.js`:

```js
import session from 'express-session';

const isProduction = process.env.NODE_ENV === 'production';

export const sessionMiddleware = session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
  },
});
```

Для локальної розробки через `http://localhost:3000` значення `secure` повинно бути `false`. У production через HTTPS — `true`.

## Порядок middleware у server.js

```js
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
```

Порядок важливий: спочатку Express відновлює сесію, потім Passport отримує з неї ID користувача.

```text
HTTP request
    ↓
session cookie
    ↓
express-session
    ↓
passport.initialize()
    ↓
passport.session()
    ↓
deserializeUser()
    ↓
req.user
    ↓
routes
```

## Реєстрація

Маршрут:

```text
POST /auth/register
```

Приклад тіла:

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

Пароль хешується:

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

Після створення користувача використовується `req.login(user, ...)`, тому користувач одразу отримує Passport-сесію.

## Вхід

Маршрут:

```text
POST /auth/login
```

Використовується:

```js
passport.authenticate('local');
```

Схема:

```text
POST /auth/login
       ↓
passport.authenticate('local')
       ↓
LocalStrategy
       ↓
email + password
       ↓
bcrypt.compare()
       ↓
serializeUser()
       ↓
express-session
       ↓
sid cookie
```

## Вихід

Маршрут:

```text
POST /auth/logout
```

Під час logout:

```js
req.logout(...)
req.session.destroy(...)
res.clearCookie('sid')
```

## Middleware авторизації

```js
export const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: 'Authentication required',
  });
};
```

`req.isAuthenticated()` додається Passport.

## Захищений маршрут

Маршрут:

```text
GET /protected
```

Приклад:

```js
router.get('/', authMiddleware, (req, res) => {
  res.json({
    message: 'Welcome to protected route',
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});
```

Без активної сесії:

```json
{
  "message": "Authentication required"
}
```

Після авторизації:

```json
{
  "message": "Welcome to protected route",
  "user": {
    "id": 1,
    "email": "test@gmail.com"
  }
}
```

# Перевірка через Thunder Client

## 1. Запуск сервера

```bash
node server.js
```

Сервер:

```text
http://localhost:3000
```

## 2. Реєстрація

```text
POST http://localhost:3000/auth/register
```

Body → JSON:

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

Очікувана відповідь:

```json
{
  "message": "Registration successful",
  "user": {
    "id": 1,
    "email": "test@gmail.com"
  }
}
```

Після реєстрації сервер створює session cookie `sid`.

## 3. Перевірка protected

```text
GET http://localhost:3000/protected
```

Якщо cookie сесії збережена та надсилається:

```json
{
  "message": "Welcome to protected route",
  "user": {
    "id": 1,
    "email": "test@gmail.com"
  }
}
```

## 4. Окрема перевірка login

```text
POST http://localhost:3000/auth/login
```

Body → JSON:

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

Після цього знову виконати:

```text
GET http://localhost:3000/protected
```

## 5. Logout

```text
POST http://localhost:3000/auth/logout
```

Після logout:

```text
GET http://localhost:3000/protected
```

Очікувано:

```json
{
  "message": "Authentication required"
}
```

# Як називається цей спосіб авторизації

**Session-based authentication using Passport.js Local Strategy**

Українською:

**Сесійна автентифікація з використанням Passport.js та локальної стратегії.**

Також у проєкті використовуються поняття:

- Stateful authentication
- Passport Local Strategy
- Express Session
- Session Cookie
- HTTP-only Cookie
- Password Hashing
- Authentication Middleware
- Protected Route
- Serialization / Deserialization

## JWT та Passport Session — різниця

Раніше використовувався JWT:

```text
login
 ↓
JWT
 ↓
token cookie
 ↓
jwt.verify()
 ↓
access
```

Зараз використовується серверна сесія:

```text
login
 ↓
Passport
 ↓
session
 ↓
sid cookie
 ↓
deserializeUser()
 ↓
req.user
 ↓
req.isAuthenticated()
 ↓
access
```

JWT-підхід часто називають **stateless authentication**.

Passport + express-session у цьому проєкті — **stateful/session-based authentication**.

## Основні маршрути

| Метод | Маршрут          | Призначення       |
| ----- | ---------------- | ----------------- |
| POST  | `/auth/register` | Реєстрація        |
| POST  | `/auth/login`    | Вхід              |
| POST  | `/auth/logout`   | Вихід             |
| GET   | `/protected`     | Захищений маршрут |

## Результат

```text
Register / Login
       ↓
Passport LocalStrategy
       ↓
bcrypt
       ↓
serializeUser
       ↓
express-session
       ↓
sid cookie
       ↓
наступний HTTP-запит
       ↓
deserializeUser
       ↓
req.user
       ↓
req.isAuthenticated()
       ↓
Protected Route
```
