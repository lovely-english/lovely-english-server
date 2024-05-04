import mongoose, { Model, Schema } from 'mongoose';

import { Files } from 'src/interfaces/files';

const filesSchema = new Schema<Files, Model<Files>>({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Files>('Files', filesSchema);
