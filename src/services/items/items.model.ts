import { Schema, Model, model } from 'mongoose';

interface IItems {
  // Define your model interface here
} 

// Items data model
const ItemsSchema = new Schema({
  // Define your schema fields here
});

const ItemsModel: Model<IItems> = model<IItems>('Items', ItemsSchema);

export default ItemsModel;
  