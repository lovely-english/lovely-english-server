import { UserModel } from 'src/interfaces/user';
import mongoose, { Model, Schema } from 'mongoose';

const userSchema = new Schema<UserModel, Model<UserModel>>(
  {
    firebaseUid: {
      type: String,
      required: true,
    },
    firtsName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dni: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<UserModel>('User', userSchema);
