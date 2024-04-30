import mongoose from 'mongoose';
import { User } from 'src/interfaces/user';

export interface Observation {
  title: string;
  description: string;
  type: string;
  author: User;
  date: Date;
  users: User[];
}

export interface ObservationModel extends Observation {
  _id?: mongoose.Types.ObjectId;
}
