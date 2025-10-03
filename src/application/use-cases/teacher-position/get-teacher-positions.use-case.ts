import { TeacherPosition } from '@/entities';
import { ITeacherPositionRepository } from '@/application/repositories';
import { IUseCase } from '..';
import { failureInternal, successOk, UseCaseReponse } from '../response';

// Define the use case
export class GetTeacherPositionsUseCase implements IUseCase<void> {
  constructor(private teacherPositionRepository: ITeacherPositionRepository) {}

  async execute(): Promise<UseCaseReponse<TeacherPosition[]>> {
    try {
      const positions = await this.teacherPositionRepository.findAll();
      return successOk(positions);
    } catch (error) {
      console.error(error);
      return failureInternal('Failed to get teacher positions');
    }
  }
}
