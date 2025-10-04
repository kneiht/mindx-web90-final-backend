import { Teacher } from '@/entities';
import mongoose from 'mongoose';

// Define the Teacher schema for MongoDB
const teacherSchema = new mongoose.Schema<
  Omit<Teacher, 'id' | 'userId' | 'orgUserId' | 'teacherPositions'> & {
    _id: string;
    userId: string;
    orgUserId: string;
    teacherPositions: string[];
  }
>({
  _id: { type: String, required: true },
  userId: {
    type: String,
    required: true,
    ref: 'users',
  },
  orgUserId: {
    type: String,
    required: false,
    ref: 'users',
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 20,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  teacherPositions: [
    {
      type: String,
      required: true,
    },
  ],
  degrees: [{}],
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

teacherSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialised.
teacherSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete (ret as any)._id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete (ret as any).__v;
  },
});

export const TeacherModel = mongoose.model('teachers', teacherSchema);
