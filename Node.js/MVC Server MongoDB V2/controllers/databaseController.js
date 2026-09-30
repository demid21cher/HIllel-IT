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

// CREATE ONE
export const createUser = async (req, res, next) => {
  try {
    const user = await MongoUser.create(req.body);

    res.json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE MANY
export const createManyUsers = async (req, res, next) => {
  try {
    const users = await MongoUser.insertMany(req.body);

    res.json({
      message: 'Users created successfully',
      users,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE ONE
export const updateUser = async (req, res, next) => {
  try {
    const result = await MongoUser.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      }
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// UPDATE MANY
export const updateManyUsers = async (req, res, next) => {
  try {
    const result = await MongoUser.updateMany(req.body.filter, {
      $set: req.body.update,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// REPLACE ONE
export const replaceUser = async (req, res, next) => {
  try {
    const result = await MongoUser.replaceOne(
      {
        _id: req.params.id,
      },
      req.body
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// DELETE ONE
export const deleteUser = async (req, res, next) => {
  try {
    const result = await MongoUser.deleteOne({
      _id: req.params.id,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// DELETE MANY
export const deleteManyUsers = async (req, res, next) => {
  try {
    const result = await MongoUser.deleteMany(req.body);

    res.json(result);
  } catch (error) {
    next(error);
  }
};
