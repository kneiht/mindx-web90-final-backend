import { Role, User } from '@/entities';
import bcrypt from 'bcryptjs';

export async function seedUsers(): Promise<User[]> {
  const hashedPassword = await bcrypt.hash('123123', 10);
  return Promise.all([
    User.hydrate({
      id: '01997199-4f31-7718-a766-687e926dd0c7',
      name: 'admin',
      email: 'admin@gmail.com',
      hashedPassword,
      role: Role.ADMIN,
      isDeleted: false,
      createdAt: new Date('2025-09-17T10:00:00.000Z'),
      updatedAt: new Date('2025-09-17T10:00:00.000Z'),
    }),
    User.hydrate({
      id: '01997199-4f31-7718-a766-687e926dd0c8',
      name: 'user1',
      email: 'user1@gmail.com',
      hashedPassword,
      role: Role.STUDENT,
      isDeleted: false,
      createdAt: new Date('2025-09-17T10:00:00.000Z'),
      updatedAt: new Date('2025-09-17T10:00:00.000Z'),
    }),
    User.hydrate({
      id: '01997199-4f31-7718-a766-687e926dd0c9',
      name: 'user2',
      email: 'user2@gmail.com',
      hashedPassword,
      role: Role.STUDENT,
      isDeleted: false,
      createdAt: new Date('2025-09-17T10:00:00.000Z'),
      updatedAt: new Date('2025-09-17T10:00:00.000Z'),
    }),
  ]);
}
