import { Teacher, CreateTeacherDto, Role } from '@/entities';
import {
  ITeacherRepository,
  IUserRepository,
} from '@/application/repositories';
import { IUseCase } from '..';
import { AddUserUseCase } from '../user/add-user.use-case';
import {
  failureConflict,
  failureInternal,
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
    private addUserUseCase: AddUserUseCase,
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

      // Check if user with email already exists
      const existingUser = await this.userRepository.findByEmail(input.email);
      if (existingUser) {
        return failureConflict('User with this email already exists');
      }

      // Create user
      const createUserDto = {
        name: input.name,
        email: input.email,
        password: '123456',
        phoneNumber: input.phoneNumber,
        address: input.address,
        identity: input.identity,
        dob: input.dob,
        role: Role.TEACHER,
      };
      const userResponse = await this.addUserUseCase.execute(createUserDto);
      if (!userResponse.success || !userResponse.data) {
        return failureValidation('Failed to create user', userResponse.error);
      }
      const user = userResponse.data;

      // Check if teacher already exists for this user
      const existingTeacher = await this.teacherRepository.findByUserId(
        user.id,
      );
      if (existingTeacher) {
        return failureConflict('Teacher already exists for this user');
      }

      const teacher = await Teacher.create({ ...input, userId: user.id });

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
