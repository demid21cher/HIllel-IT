import mongoose from 'mongoose';

const mongoUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
    },
  },
  {
    collection: 'users',
  }
);

const MongoUser = mongoose.model('MongoUser', mongoUserSchema);

export default MongoUser;
