import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';

// Import Repositories
import {
  ITeacherRepository,
  IUserRepository,
  ITeacherPositionRepository,
} from '@/application/repositories';
import {
  TeacherRepository,
  UserRepository,
  TeacherPositionRepository,
} from '@/adapters/repositories';

// Import Use Cases
import { GetTeachersUseCase, AddTeacherUseCase } from '@/application/use-cases';

@Module({
  controllers: [TeachersController],
  providers: [
    {
      provide: GetTeachersUseCase,
      useFactory: (
        teacherRepo: ITeacherRepository,
        userRepo: IUserRepository,
        positionRepo: ITeacherPositionRepository,
      ) => new GetTeachersUseCase(teacherRepo, userRepo, positionRepo),
      inject: [
        'ITeacherRepository',
        'IUserRepository',
        'ITeacherPositionRepository',
      ],
    },
    {
      provide: AddTeacherUseCase,
      useFactory: (
        teacherRepo: ITeacherRepository,
        userRepo: IUserRepository,
      ) => new AddTeacherUseCase(teacherRepo, userRepo),
      inject: ['ITeacherRepository', 'IUserRepository'],
    },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'ITeacherRepository', useClass: TeacherRepository },
    {
      provide: 'ITeacherPositionRepository',
      useClass: TeacherPositionRepository,
    },
  ],
})
export class TeachersModule {}
