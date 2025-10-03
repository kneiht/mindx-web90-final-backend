import {
  TeacherPosition,
  HydrateTeacherPositionDto,
} from '@/entities/teacher-position.entity';
import { ITeacherPositionRepository } from '@/application/repositories';
import { TeacherPositionModel } from './schemas/teacher-position.schema';
import { MongoRepository } from './base.repository';

export class TeacherPositionMongoRepository
  extends MongoRepository<TeacherPosition>
  implements ITeacherPositionRepository
{
  constructor() {
    super(TeacherPositionModel);
  }

  async findByCode(code: string): Promise<TeacherPosition | null> {
    const doc = await TeacherPositionModel.findOne({ code }).exec();
    if (!doc) return null;
    const hydrateDto: HydrateTeacherPositionDto = {
      id: doc._id.toString(),
      name: doc.name,
      code: doc.code,
      description: doc.description,
      isActive: doc.isActive,
      isDeleted: doc.isDeleted,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
    return await TeacherPosition.hydrate(hydrateDto);
  }

  async findAll(): Promise<TeacherPosition[]> {
    const docs = await TeacherPositionModel.find().exec();
    const positions: TeacherPosition[] = [];
    for (const doc of docs) {
      const hydrateDto: HydrateTeacherPositionDto = {
        id: doc._id.toString(),
        name: doc.name,
        code: doc.code,
        description: doc.description,
        isActive: doc.isActive,
        isDeleted: doc.isDeleted,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      };
      const position = await TeacherPosition.hydrate(hydrateDto);
      positions.push(position);
    }
    return positions;
  }

  // Override add and update to handle specific logic
  async add(position: TeacherPosition): Promise<TeacherPosition> {
    const positionData = {
      _id: position.id,
      name: position.name,
      code: position.code,
      description: position.description,
      isActive: position.isActive,
      isDeleted: position.isDeleted,
      createdAt: position.createdAt,
      updatedAt: position.updatedAt,
    };
    await TeacherPositionModel.create(positionData);
    return position;
  }

  async update(position: TeacherPosition): Promise<TeacherPosition> {
    await TeacherPositionModel.findByIdAndUpdate(position.id, {
      name: position.name,
      code: position.code,
      description: position.description,
      isActive: position.isActive,
      isDeleted: position.isDeleted,
      updatedAt: position.updatedAt,
    }).exec();
    return position;
  }
}
