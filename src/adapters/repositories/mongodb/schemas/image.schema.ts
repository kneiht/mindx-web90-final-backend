import { Image } from '@/entities';
import mongoose from 'mongoose';

// Define the Image schema for MongoDB
const imageSchema = new mongoose.Schema<Omit<Image, 'id'> & { _id: string }>({
  _id: { type: String, required: true },
  url: {
    type: String,
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

imageSchema.virtual('id').get(function () {
  return this._id.toString();
});

imageSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete (ret as any)._id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete (ret as any).__v;
  },
});

export const ImageModel = mongoose.model('images', imageSchema);
