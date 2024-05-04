import mongoose, { Model, Schema } from 'mongoose';

import { Levels } from 'src/interfaces/levels';

const leveslSchema = new Schema<Levels, Model<Levels>>({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  enableUsers: {
    type: String,
    required: true,
  },
  themes: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Themes',
    },
  ],
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export default mongoose.model<Levels>('Levels', leveslSchema);
