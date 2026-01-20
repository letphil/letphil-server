import { Schema, Model, model } from 'mongoose';

interface IUser {
  // Define your model interface here
} 

// User data model
const UserSchema = new Schema({
  // Define your schema fields here
});

const UserModel: Model<IUser> = model<IUser>('User', UserSchema);

export default UserModel;
  