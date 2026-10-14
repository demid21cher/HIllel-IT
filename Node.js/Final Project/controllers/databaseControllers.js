import userModels from '../models/userModels.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await userModels.find();
    console.log(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await userModels.create(req.body);
    console.log(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const result = await userModels.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      }
    );
    console.log(result);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const result = await userModels.deleteOne({
      _id: req.params.id,
    });
    console.log(result);
  } catch (error) {
    next(error);
  }
};
