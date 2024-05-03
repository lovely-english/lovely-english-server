import mongoose, { Model, Schema } from 'mongoose';

import { Themes } from 'src/interfaces/themes';

const themesSchema = new Schema<Themes, Model<Themes>>({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Content',
    },
  ],
  enableUsers: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export default mongoose.model<Themes>('Themes', themesSchema);
