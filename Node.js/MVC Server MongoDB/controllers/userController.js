const users = [
  {
    id: 1,
    name: 'Іван Петренко',
    email: 'ivan@gmail.com',
    age: 25,
  },
  {
    id: 2,
    name: 'Марія Коваль',
    email: 'maria@gmail.com',
    age: 22,
  },
  {
    id: 3,
    name: 'Олександр Бондар',
    email: 'alex@gmail.com',
    age: 30,
  },
];

export const getUsers = (req, res) => {
  res.render('users/index.pug', {
    users,
  });
};

export const postUsers = (req, res) => {
  res.type('text').send('Post users route');
};

export const getUserById = (req, res) => {
  const userId = Number(req.params.userId);

  const user = users.find((item) => item.id === userId);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.render('users/details.pug', {
    user,
  });
};

export const putUserById = (req, res) => {
  const userId = req.params.userId;

  res.type('text').send(`Update user with ID: ${userId}`);
};

export const deleteUserById = (req, res) => {
  const userId = req.params.userId;

  res.type('text').send(`Delete user with ID: ${userId}`);
};
