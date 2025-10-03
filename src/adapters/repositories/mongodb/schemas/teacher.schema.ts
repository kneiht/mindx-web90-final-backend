import { Teacher } from '@/entities';
import mongoose from 'mongoose';

// Define the degree schema
const degreeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  isGraduated: {
    type: Boolean,
    required: true,
  },
});

// Define the Teacher schema for MongoDB
const teacherSchema = new mongoose.Schema<
  Omit<Teacher, 'id' | 'userId' | 'teacherPositions'> & {
    _id: string;
    userId: string;
    teacherPositions: string[];
  }
>({
  _id: { type: String, required: true },
  userId: {
    type: String,
    required: true,
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
    maxlength: 10,
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
  degrees: [degreeSchema],
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
