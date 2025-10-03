import { User } from '@/entities';
import mongoose from 'mongoose';

// Define the User schema for MongoDB
const userSchema = new mongoose.Schema<
  Omit<User, 'id' | 'role'> & {
    _id: string;
    hashedPassword: string;
    role: string;
  }
>({
  _id: { type: String, required: true },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  identity: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    required: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['STUDENT', 'TEACHER', 'ADMIN'],
    default: 'STUDENT',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

userSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete (ret as any)._id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete (ret as any).__v;
  },
});

export const UserModel = mongoose.model('users', userSchema);
