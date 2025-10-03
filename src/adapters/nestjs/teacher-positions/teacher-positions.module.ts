import { Module } from '@nestjs/common';
import { TeacherPositionsController } from './teacher-positions.controller';

// Import Repository
import { ITeacherPositionRepository } from '@/application/repositories';
import { TeacherPositionRepository } from '@/adapters/repositories';

// Import Use Cases
import {
  GetTeacherPositionsUseCase,
  AddTeacherPositionUseCase,
} from '@/application/use-cases';

@Module({
  controllers: [TeacherPositionsController],
  providers: [
    {
      provide: 'ITeacherPositionRepository',
      useClass: TeacherPositionRepository,
    },
    {
      provide: GetTeacherPositionsUseCase,
      useFactory: (teacherPositionRepository: ITeacherPositionRepository) =>
        new GetTeacherPositionsUseCase(teacherPositionRepository),
      inject: ['ITeacherPositionRepository'],
    },
    {
      provide: AddTeacherPositionUseCase,
      useFactory: (teacherPositionRepository: ITeacherPositionRepository) =>
        new AddTeacherPositionUseCase(teacherPositionRepository),
      inject: ['ITeacherPositionRepository'],
    },
  ],
})
export class TeacherPositionsModule {}
