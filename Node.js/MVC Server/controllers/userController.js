export const getUsers = (req, res) => {
  res.type('text').send('Get users route');
};

export const postUsers = (req, res) => {
  res.type('text').send('Post users route');
};

export const getUserById = (req, res) => {
  const userId = req.params.userId;

  res.type('text').send(`Get user with ID: ${userId}`);
};

export const putUserById = (req, res) => {
  const userId = req.params.userId;

  res.type('text').send(`Update user with ID: ${userId}`);
};

export const deleteUserById = (req, res) => {
  const userId = req.params.userId;

  res.type('text').send(`Delete user with ID: ${userId}`);
};
