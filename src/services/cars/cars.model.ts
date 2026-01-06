import { Schema, Model, model } from 'mongoose';

interface ICars {
  // Define your model interface here
} 

// Cars data model
const CarsSchema = new Schema({
  // Define your schema fields here
});

const CarsModel: Model<ICars> = model<ICars>('Cars', CarsSchema);

export default CarsModel;
  