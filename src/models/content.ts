import mongoose, { Model, Schema } from 'mongoose';

import { Content } from 'src/interfaces/content';

const contentSchema = new Schema<Content, Model<Content>>({
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
  skills: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  files: {
    type: String,
    required: true,
  },
  isActivity: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export default mongoose.model<Content>('Content', contentSchema);
