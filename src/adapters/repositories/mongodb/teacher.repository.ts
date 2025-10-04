import { Teacher, HydrateTeacherDto } from '@/entities/teacher.entity';
import { ITeacherRepository } from '@/application/repositories';
import { TeacherModel } from './schemas/teacher.schema';
import { MongoRepository } from './base.repository';

export class TeacherMongoRepository
  extends MongoRepository<Teacher>
  implements ITeacherRepository
{
  constructor() {
    super(TeacherModel);
  }

  async findByUserId(userId: string): Promise<Teacher | null> {
    const doc = await TeacherModel.findOne({ userId }).exec();
    if (!doc) return null;
    const hydrateDto: HydrateTeacherDto = {
      id: doc._id.toString(),
      userId: doc.userId,
      orgUserId: doc.orgUserId || undefined,
      isActive: doc.isActive,
      isDeleted: doc.isDeleted,
      code: doc.code,
      startDate: doc.startDate || undefined,
      endDate: doc.endDate || undefined,
      teacherPositions: doc.teacherPositions,
      degrees: doc.degrees,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
    return await Teacher.hydrate(hydrateDto);
  }

  async findByCode(code: string): Promise<Teacher | null> {
    const doc = await TeacherModel.findOne({ code }).exec();
    if (!doc) return null;
    const hydrateDto: HydrateTeacherDto = {
      id: doc._id.toString(),
      userId: doc.userId,
      orgUserId: doc.orgUserId || undefined,
      isActive: doc.isActive,
      isDeleted: doc.isDeleted,
      code: doc.code,
      startDate: doc.startDate || undefined,
      endDate: doc.endDate || undefined,
      teacherPositions: doc.teacherPositions,
      degrees: doc.degrees,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
    return await Teacher.hydrate(hydrateDto);
  }

  async findAll(): Promise<Teacher[]> {
    const docs = await TeacherModel.find().exec();
    const teachers: Teacher[] = [];
    for (const doc of docs) {
      const hydrateDto: HydrateTeacherDto = {
        id: doc._id.toString(),
        userId: doc.userId,
        orgUserId: doc.orgUserId,
        isActive: doc.isActive,
        isDeleted: doc.isDeleted,
        code: doc.code,
        startDate: doc.startDate,
        endDate: doc.endDate,
        teacherPositions: doc.teacherPositions,
        degrees: doc.degrees,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      };
      const teacher = await Teacher.hydrate(hydrateDto);
      teachers.push(teacher);
    }
    return teachers;
  }

  // Override add and update to handle specific logic
  async add(teacher: Teacher): Promise<Teacher> {
    const teacherData = {
      _id: teacher.id,
      userId: teacher.userId,
      orgUserId: teacher.orgUserId,
      isActive: teacher.isActive,
      isDeleted: teacher.isDeleted,
      code: teacher.code,
      startDate: teacher.startDate,
      endDate: teacher.endDate,
      teacherPositions: teacher.teacherPositions,
      degrees: teacher.degrees,
      createdAt: teacher.createdAt,
      updatedAt: teacher.updatedAt,
    };
    await TeacherModel.create(teacherData);
    return teacher;
  }

  async update(teacher: Teacher): Promise<Teacher> {
    await TeacherModel.findByIdAndUpdate(teacher.id, {
      userId: teacher.userId,
      orgUserId: teacher.orgUserId,
      isActive: teacher.isActive,
      isDeleted: teacher.isDeleted,
      code: teacher.code,
      startDate: teacher.startDate,
      endDate: teacher.endDate,
      teacherPositions: teacher.teacherPositions,
      degrees: teacher.degrees,
      updatedAt: teacher.updatedAt,
    }).exec();
    return teacher;
  }
}
