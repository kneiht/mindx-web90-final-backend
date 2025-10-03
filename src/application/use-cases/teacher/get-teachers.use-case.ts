import {
  ITeacherRepository,
  IUserRepository,
  ITeacherPositionRepository,
} from '@/application/repositories';
import { IUseCase } from '..';
import { failureInternal, successOk, UseCaseReponse } from '../response';

export interface GetTeachersResponse {
  code: string;
  name: string;
  email: string;
  phoneNumber?: string;
  isActive: boolean;
  address?: string;
  positions: {
    name: string;
    code: string;
    description?: string;
  }[];
  degrees: {
    type: string;
    school: string;
    major: string;
    year: number;
    isGraduated: boolean;
  }[];
}

// Define the use case
export class GetTeachersUseCase implements IUseCase<void> {
  constructor(
    private teacherRepository: ITeacherRepository,
    private userRepository: IUserRepository,
    private teacherPositionRepository: ITeacherPositionRepository,
  ) {}

  async execute(): Promise<UseCaseReponse<GetTeachersResponse[]>> {
    try {
      // Fetch all teachers
      const teachers = await this.teacherRepository.findAll();

      const responses: GetTeachersResponse[] = [];

      for (const teacher of teachers) {
        // Fetch user
        const user = await this.userRepository.findById(teacher.userId);
        if (!user) continue; // Skip if user not found

        // Fetch positions
        const positions: {
          name: string;
          code: string;
          description?: string;
        }[] = [];
        for (const posId of teacher.teacherPositions) {
          const pos = await this.teacherPositionRepository.findById(posId);
          if (pos) {
            positions.push({
              name: pos.name,
              code: pos.code,
              description: pos.description,
            });
          }
        }

        responses.push({
          code: teacher.code,
          name: user.name || '',
          email: user.email,
          phoneNumber: user.phoneNumber || undefined,
          isActive: teacher.isActive,
          address: user.address || undefined,
          positions,
          degrees: teacher.degrees,
        });
      }

      return successOk(responses);
    } catch (error) {
      console.error(error);
      return failureInternal('Failed to get teachers');
    }
  }
}
