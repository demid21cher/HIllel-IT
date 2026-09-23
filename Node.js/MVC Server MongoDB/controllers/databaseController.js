import MongoUser from '../models/MongoUser.js';

export const getDatabaseUsers = async (req, res, next) => {
  try {
    const users = await MongoUser.find();

    res.render('database/users.pug', {
      users,
    });
  } catch (error) {
    next(error);
  }
};
