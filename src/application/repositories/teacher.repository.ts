import { IBaseRepository } from './base.repository';
import { Teacher } from '@/entities';

export interface ITeacherRepository extends IBaseRepository<Teacher> {
  findByUserId(userId: string): Promise<Teacher | null>;
  findByCode(code: string): Promise<Teacher | null>;
}
