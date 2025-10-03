import { Post } from '@/entities';
import mongoose from 'mongoose';

// Define the Post schema for MongoDB
const postSchema = new mongoose.Schema<Omit<Post, 'id'> & { _id: string }>({
  _id: { type: String, required: true },
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  content: {
    type: String,
    required: true,
    minlength: 3,
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

postSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialised.
postSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete (ret as any)._id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete (ret as any).__v;
  },
});

export const PostModel = mongoose.model('posts', postSchema);
