import mongoose from 'mongoose';
import { User } from 'src/interfaces/user';

export type ObservationType = 'PUBLIC' | 'PRIVATE';

export interface Observation {
  title: string;
  description: string;
  type: ObservationType;
  author: User;
  date: Date;
  users: User[];
}

export interface ObservationModel extends Observation {
  _id?: mongoose.Types.ObjectId;
}
