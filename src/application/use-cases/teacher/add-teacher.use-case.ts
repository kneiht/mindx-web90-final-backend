import { Teacher, CreateTeacherDto } from '@/entities';
import {
  ITeacherRepository,
  IUserRepository,
} from '@/application/repositories';
import { IUseCase } from '..';
import {
  failureConflict,
  failureInternal,
  failureNotFound,
  failureValidation,
  successCreated,
  UseCaseReponse,
} from '../response';
import { EntityValidationError, EntityInputValidationError } from '@/entities';
import { validateSafe } from '@/shared/validator';

// Define the use case for adding a teacher
export class AddTeacherUseCase implements IUseCase<CreateTeacherDto> {
  constructor(
    private teacherRepository: ITeacherRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(input: CreateTeacherDto): Promise<UseCaseReponse<Teacher>> {
    try {
      // Validate the input
      const { ok, message } = await validateSafe(
        input as object,
        CreateTeacherDto,
      );
      if (!ok) {
        return failureValidation('Input validation failed', message);
      }

      // Check if user exists
      const user = await this.userRepository.findById(input.userId);
      if (!user) {
        return failureNotFound('User not found');
      }

      // Check if teacher already exists for this user
      const existingTeacher = await this.teacherRepository.findByUserId(
        input.userId,
      );
      if (existingTeacher) {
        return failureConflict('Teacher already exists for this user');
      }

      // Check if code is provided and unique
      if (input.code) {
        const existingByCode = await this.teacherRepository.findByCode(
          input.code,
        );
        if (existingByCode) {
          return failureConflict('Teacher with this code already exists');
        }
      }

      const teacher = await Teacher.create(input);

      // Add to Repository
      const newTeacher = await this.teacherRepository.add(teacher);

      // Return Success Response
      return successCreated(newTeacher);
    } catch (error) {
      console.error(error);
      if (error instanceof EntityInputValidationError) {
        return failureValidation('Input validation failed', error.message);
      }
      if (error instanceof EntityValidationError) {
        return failureValidation('Entity validation failed', error.message);
      }
      return failureInternal('Failed to create teacher');
    }
  }
}
