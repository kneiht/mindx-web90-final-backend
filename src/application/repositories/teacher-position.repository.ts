import { IBaseRepository } from './base.repository';
import { TeacherPosition } from '@/entities';

export interface ITeacherPositionRepository
  extends IBaseRepository<TeacherPosition> {
  findByCode(code: string): Promise<TeacherPosition | null>;
}
