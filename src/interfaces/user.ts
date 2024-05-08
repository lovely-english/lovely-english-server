import mongoose from 'mongoose';

export type Role = 'ADMIN' | 'TUTOR' | 'STUDENT';

export interface User {
  firebaseUid: string;
  firstName: string;
  lastName: string;
  dni: string;
  address: string;
  email: string;
  password: string;
  phone: string;
  isActive: boolean;
  role: Role;
  profileImage: string;
}

export interface UserModel extends User {
  _id?: mongoose.Types.ObjectId;
}
