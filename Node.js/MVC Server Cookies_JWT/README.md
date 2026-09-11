# Node.js + Express.js: Static Files, Cookies та JWT

Навчальний проєкт на **Node.js** та **Express.js**, у якому реалізовано:

- роботу зі статичними файлами;
- відображення favicon на HTML-сторінках;
- використання PUG та EJS;
- збереження теми оформлення через cookies;
- використання `cookie-parser`;
- реєстрацію та авторизацію через JWT;
- збереження JWT у `httpOnly` cookie;
- захист маршрутів за допомогою middleware.

## 1. Технології

- Node.js
- Express.js
- PUG
- EJS
- cookie-parser
- jsonwebtoken
- bcryptjs
- express-session

## 2. Встановлення залежностей

```bash
npm install
```

Якщо потрібні пакети ще не встановлені:

```bash
npm install express pug ejs cookie-parser jsonwebtoken bcryptjs express-session
```

## 3. Структура проєкту

```text
project/
├── controllers/
│   ├── authController.js
│   ├── themeController.js
│   ├── userController.js
│   ├── articleController.js
│   └── rootController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── articleAccessMiddleware.js
│   ├── errorMiddleware.js
│   ├── loggerMiddleware.js
│   ├── sessionMiddleware.js
│   ├── themeMiddleware.js
│   └── validationMiddleware.js
├── routes/
│   ├── authRoutes.js
│   ├── themeRoutes.js
│   ├── userRoutes.js
│   ├── articleRoutes.js
│   └── rootRoutes.js
├── public/
│   ├── favicon.ico
│   └── styles.css
├── views/
│   ├── users/
│   │   ├── index.pug
│   │   └── details.pug
│   └── articles/
│       ├── index.ejs
│       └── details.ejs
├── server.js
├── package.json
└── README.md
```

## 4. Статичні файли та favicon

У `server.js`:

```js
app.use(express.static(path.join(__dirname, 'public')));
```

Файл favicon:

```text
public/favicon.ico
```

### PUG

```pug
link(rel="icon" href="/favicon.ico")
```

### EJS

```html
<link rel="icon" href="/favicon.ico" />
```

Таким чином favicon відображається на всіх HTML-сторінках.

## 5. Cookies

Підключення:

```js
import cookieParser from 'cookie-parser';

app.use(cookieParser());
```

Cookies читаються через:

```js
req.cookies;
```

## 6. Збереження теми

`controllers/themeController.js`:

```js
export const setTheme = (req, res) => {
  const { theme } = req.body;

  if (!['light', 'dark'].includes(theme)) {
    return res.status(400).json({
      message: 'Theme must be light or dark',
    });
  }

  res.cookie('theme', theme, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: 'lax',
  });

  res.json({
    message: 'Theme saved',
    theme,
  });
};

export const getTheme = (req, res) => {
  const theme = req.cookies.theme || 'light';

  res.json({ theme });
};
```

`routes/themeRoutes.js`:

```js
import express from 'express';

import { setTheme, getTheme } from '../controllers/themeController.js';

const router = express.Router();

router.get('/', getTheme);
router.post('/', setTheme);

export default router;
```

Маршрути:

```text
GET /theme
POST /theme
```

Приклад:

```json
{
  "theme": "dark"
}
```

## 7. Middleware теми

`middleware/themeMiddleware.js`:

```js
export const themeMiddleware = (req, res, next) => {
  res.locals.theme = req.cookies.theme || 'light';
  next();
};
```

## 8. CSS для тем

`public/styles.css`:

```css
body {
  font-family: Arial, sans-serif;
  padding: 30px;
}

body.light {
  background: white;
  color: black;
}

body.dark {
  background: #222;
  color: white;
}

body.dark a {
  color: #7db7ff;
}
```

PUG:

```pug
body(class=theme)
```

EJS:

```html
<body class="<%= theme %>"></body>
```

## 9. JWT

Для JWT використовується пакет `jsonwebtoken`.

Токен зберігається у cookie:

```js
res.cookie('token', token, {
  httpOnly: true,
  maxAge: 1000 * 60 * 60,
  sameSite: 'lax',
});
```

`httpOnly: true` захищає токен від доступу через `document.cookie`.

## 10. Реєстрація та вхід

`controllers/authController.js`:

```js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'my-jwt-secret';
const users = [];

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    });
  }

  const exists = users.find((user) => user.email === email);

  if (exists) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: users.length + 1,
    email,
    password: hashedPassword,
  };

  users.push(user);

  const token = createToken(user);

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    sameSite: 'lax',
  });

  res.status(201).json({
    message: 'Registration successful',
    user: {
      id: user.id,
      email: user.email,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  const token = createToken(user);

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    sameSite: 'lax',
  });

  res.json({
    message: 'Login successful',
  });
};

export const logout = (req, res) => {
  res.clearCookie('token');

  res.json({
    message: 'Logout successful',
  });
};
```

## 11. Маршрути авторизації

`routes/authRoutes.js`:

```js
import express from 'express';

import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
```

Маршрути:

```text
POST /auth/register
POST /auth/login
POST /auth/logout
```

## 12. JWT Middleware

`middleware/authMiddleware.js`:

```js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'my-jwt-secret';

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'Authentication required',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};
```

Алгоритм:

```text
HTTP-запит
    ↓
JWT cookie
    ↓
authMiddleware
    ↓
jwt.verify()
    ↓
req.user
    ↓
контролер
```

## 13. Захищені маршрути

```js
router.get('/', authMiddleware, getUsers);
```

або:

```js
router.get('/:userId', authMiddleware, validateUserId, getUserById);
```

Без токена:

```text
401 Authentication required
```

При неправильному або простроченому JWT:

```text
401 Invalid or expired token
```

## 14. server.js

```js
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import rootRoutes from './routes/rootRoutes.js';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import authRoutes from './routes/authRoutes.js';
import themeRoutes from './routes/themeRoutes.js';

import { sessionMiddleware } from './middleware/sessionMiddleware.js';
import { themeMiddleware } from './middleware/themeMiddleware.js';

import {
  notFoundMiddleware,
  errorMiddleware,
} from './middleware/errorMiddleware.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionMiddleware);
app.use(themeMiddleware);

app.use('/', rootRoutes);
app.use('/auth', authRoutes);
app.use('/theme', themeRoutes);
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Сервер запущено за адресою http://localhost:${port}`);
});
```

## 15. Запуск

```bash
node server.js
```

Сервер:

```text
http://localhost:3000
```

## 16. Основні маршрути

| Метод | Маршрут                | Призначення         |
| ----- | ---------------------- | ------------------- |
| GET   | `/users`               | Список користувачів |
| GET   | `/users/:userId`       | Дані користувача    |
| GET   | `/articles`            | Список статей       |
| GET   | `/articles/:articleId` | Дані статті         |
| GET   | `/theme`               | Отримати тему       |
| POST  | `/theme`               | Зберегти тему       |
| POST  | `/auth/register`       | Реєстрація          |
| POST  | `/auth/login`          | Вхід                |
| POST  | `/auth/logout`         | Вихід               |
| GET   | `/favicon.ico`         | Favicon             |

## 17. Результат

У проєкті реалізовано:

- Node.js та Express.js;
- PUG та EJS;
- статичні файли через `public`;
- favicon;
- cookies через `cookie-parser`;
- збереження світлої/темної теми;
- JWT-авторизацію;
- реєстрацію, вхід і вихід;
- хешування паролів через `bcryptjs`;
- JWT у `httpOnly` cookie;
- middleware для перевірки JWT;
- захищені маршрути.
