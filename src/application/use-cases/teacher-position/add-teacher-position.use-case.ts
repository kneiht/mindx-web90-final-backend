import { TeacherPosition, CreateTeacherPositionDto } from '@/entities';
import { ITeacherPositionRepository } from '@/application/repositories';
import { IUseCase } from '..';
import {
  failureConflict,
  failureInternal,
  failureValidation,
  successCreated,
  UseCaseReponse,
} from '../response';
import { EntityValidationError, EntityInputValidationError } from '@/entities';
import { validateSafe } from '@/shared/validator';

// Define the use case for adding a teacher position
export class AddTeacherPositionUseCase
  implements IUseCase<CreateTeacherPositionDto>
{
  constructor(private teacherPositionRepository: ITeacherPositionRepository) {}

  async execute(
    input: CreateTeacherPositionDto,
  ): Promise<UseCaseReponse<TeacherPosition>> {
    try {
      // Validate the input
      const { ok, message } = await validateSafe(
        input as object,
        CreateTeacherPositionDto,
      );
      if (!ok) {
        return failureValidation('Input validation failed', message);
      }

      // Check if code is unique
      const existing = await this.teacherPositionRepository.findByCode(
        input.code,
      );
      if (existing) {
        return failureConflict(
          'Teacher position with this code already exists',
        );
      }

      const position = await TeacherPosition.create(input);

      // Add to Repository
      const newPosition = await this.teacherPositionRepository.add(position);

      // Return Success Response
      return successCreated(newPosition);
    } catch (error) {
      console.error(error);
      if (error instanceof EntityInputValidationError) {
        return failureValidation('Input validation failed', error.message);
      }
      if (error instanceof EntityValidationError) {
        return failureValidation('Entity validation failed', error.message);
      }
      return failureInternal('Failed to create teacher position');
    }
  }
}
