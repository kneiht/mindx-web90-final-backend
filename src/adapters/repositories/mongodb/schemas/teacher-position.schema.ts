import { TeacherPosition } from '@/entities';
import mongoose from 'mongoose';

// Define the TeacherPosition schema for MongoDB
const teacherPositionSchema = new mongoose.Schema<
  Omit<TeacherPosition, 'id'> & {
    _id: string;
  }
>({
  _id: { type: String, required: true },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: false,
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
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

teacherPositionSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialised.
teacherPositionSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete (ret as any)._id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete (ret as any).__v;
  },
});

export const TeacherPositionModel = mongoose.model(
  'teacher_positions',
  teacherPositionSchema,
);
