import { Post } from '@/entities/post.entity.js';
import { IPostRepository } from '@/application/repositories';
import { PostModel } from './schemas/post.schema.js';
import { MongoRepository } from './base.repository.js';

export class PostMongoRepository
  extends MongoRepository<Post>
  implements IPostRepository
{
  constructor() {
    super(PostModel);
  }
}
