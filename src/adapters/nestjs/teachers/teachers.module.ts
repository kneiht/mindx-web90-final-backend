import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { UsersModule } from '../users/users.module';

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
import {
  GetTeachersUseCase,
  AddTeacherUseCase,
  AddUserUseCase,
} from '@/application/use-cases';

@Module({
  imports: [UsersModule],
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
        addUserUseCase: AddUserUseCase,
      ) => new AddTeacherUseCase(teacherRepo, userRepo, addUserUseCase),
      inject: ['ITeacherRepository', 'IUserRepository', AddUserUseCase],
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
