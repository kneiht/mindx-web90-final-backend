import { Image } from '@/entities';
import { IImageRepository } from '@/application/repositories';
import { MongoRepository } from './base.repository';
import { ImageModel } from './schemas/image.schema';

export class ImageMongoRepository
  extends MongoRepository<Image>
  implements IImageRepository
{
  constructor() {
    super(ImageModel);
  }
}
