import { Model } from 'mongoose';
import { IBaseRepository } from '@/application/repositories';

export abstract class MongoRepository<TEntity extends { id: string }>
  implements IBaseRepository<TEntity>
{
  constructor(private readonly model: Model<any>) {}

  async findById(id: string): Promise<TEntity | null> {
    const doc = await this.model.findById(id).exec();
    if (!doc) return null;
    return doc as TEntity;
  }

  async findAll(): Promise<TEntity[]> {
    const docs = await this.model.find().exec();
    return docs as TEntity[];
  }

  async add(entity: TEntity): Promise<TEntity> {
    console.log(entity);
    const doc = { ...entity, _id: entity.id };
    await this.model.create(doc);
    return entity;
  }

  async update(entity: TEntity): Promise<TEntity> {
    await this.model.findByIdAndUpdate(entity.id, entity).exec();
    return entity;
  }

  async delete(entity: TEntity): Promise<void> {
    await this.model.findByIdAndDelete(entity.id).exec();
  }
}
