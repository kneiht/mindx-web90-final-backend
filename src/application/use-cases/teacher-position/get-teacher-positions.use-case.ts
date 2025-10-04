import { TeacherPosition } from '@/entities';
import { ITeacherPositionRepository } from '@/application/repositories';
import { IUseCase } from '..';
import { failureInternal, successOk, UseCaseReponse } from '../response';

// Define the use case
export class GetTeacherPositionsUseCase implements IUseCase<string> {
  constructor(private teacherPositionRepository: ITeacherPositionRepository) {}

  async execute(orgUserId: string): Promise<UseCaseReponse<TeacherPosition[]>> {
    try {
      const positions = await this.teacherPositionRepository.findAll();
      const filteredPositions = positions.filter(
        (p) => p.orgUserId === orgUserId,
      );
      return successOk(filteredPositions);
    } catch (error) {
      console.error(error);
      return failureInternal('Failed to get teacher positions');
    }
  }
}
