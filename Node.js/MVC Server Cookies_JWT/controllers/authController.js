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
