import mongoose, { Model, Schema } from 'mongoose';
import { ObservationModel } from 'src/interfaces/observations';

const observationSchema = new Schema<ObservationModel, Model<ObservationModel>>(
  {
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
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: {
      type: Date,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<ObservationModel>('Observation', observationSchema)