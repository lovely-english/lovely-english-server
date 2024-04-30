import mongoose, { Model, Schema } from 'mongoose';

export interface ObservationType {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  type: string;
  author: string; //TO DO: We will replace this by userInterface
  date: Date;
  users: string[]; //TO DO: We will replaace this by userInterface []
}

export interface UserDocument extends ObservationType, Document {
  _id?: mongoose.Types.ObjectId;
}

const observationSchema = new Schema<ObservationType, Model<ObservationType>>(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    //   author: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User',
    //     unique: false,
    //   },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    users: [{ 
      type: String, 
      required: true }],
  },
  { timestamps: true },
);
