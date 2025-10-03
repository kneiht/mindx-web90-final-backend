import { Image } from '@/entities/image.entity.js';
import { IBaseRepository } from './base.repository.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IImageRepository extends IBaseRepository<Image> {}
