import { Schema, Model, model } from 'mongoose';

interface IUsers {
  // Define your model interface here
}

// Users data model
const UsersSchema = new Schema({
  // Define your schema fields here
});

const UsersModel: Model<IUsers> = model<IUsers>('Users', UsersSchema);

export default UsersModel;
