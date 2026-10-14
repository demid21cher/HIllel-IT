import userSchema from '../schemas/userSchemas.js';
import mongoose from 'mongoose';

const User = mongoose.model('User', userSchema);

export default User;
