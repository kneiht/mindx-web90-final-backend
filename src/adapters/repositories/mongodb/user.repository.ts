import { User, HydrateUserDto } from '@/entities/user.entity';
import { IUserRepository } from '@/application/repositories';
import { UserModel } from './schemas/user.schema';
import { MongoRepository } from './base.repository';

export class UserMongoRepository
  extends MongoRepository<User>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email: email.toLowerCase() }).exec();
    if (!doc) return null;
    const hydrateDto: HydrateUserDto = {
      id: doc._id.toString(),
      name: doc.name || undefined,
      email: doc.email,
      phoneNumber: doc.phoneNumber || undefined,
      address: doc.address || undefined,
      identity: doc.identity || undefined,
      dob: doc.dob || undefined,
      isDeleted: doc.isDeleted,
      hashedPassword: doc.hashedPassword,
      role: doc.role as any, // Assuming role is string, but enum
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
    return await User.hydrate(hydrateDto);
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id).exec();
    if (!doc) return null;
    const hydrateDto: HydrateUserDto = {
      id: doc._id.toString(),
      name: doc.name || undefined,
      email: doc.email,
      phoneNumber: doc.phoneNumber || undefined,
      address: doc.address || undefined,
      identity: doc.identity || undefined,
      dob: doc.dob || undefined,
      isDeleted: doc.isDeleted,
      hashedPassword: doc.hashedPassword,
      role: doc.role as any,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
    return await User.hydrate(hydrateDto);
  }

  async findByName(name: string): Promise<User | null> {
    const doc = await UserModel.findOne({ name }).exec();
    if (!doc) return null;
    const hydrateDto: HydrateUserDto = {
      id: doc._id.toString(),
      name: doc.name || undefined,
      email: doc.email,
      phoneNumber: doc.phoneNumber || undefined,
      address: doc.address || undefined,
      identity: doc.identity || undefined,
      dob: doc.dob || undefined,
      isDeleted: doc.isDeleted,
      hashedPassword: doc.hashedPassword,
      role: doc.role as any,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
    return await User.hydrate(hydrateDto);
  }

  async findAll(): Promise<User[]> {
    const docs = await UserModel.find().exec();
    const users: User[] = [];
    for (const doc of docs) {
      const hydrateDto: HydrateUserDto = {
        id: doc._id.toString(),
        name: doc.name || undefined,
        email: doc.email,
        phoneNumber: doc.phoneNumber || undefined,
        address: doc.address || undefined,
        identity: doc.identity || undefined,
        dob: doc.dob || undefined,
        isDeleted: doc.isDeleted,
        hashedPassword: doc.hashedPassword,
        role: doc.role as any,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      };
      const user = await User.hydrate(hydrateDto);
      users.push(user);
    }
    return users;
  }

  // Override add and update to handle specific logic like password hashing and email case
  async add(user: User): Promise<User> {
    const userData = {
      _id: user.id,
      name: user.name,
      email: user.email.toLowerCase(),
      phoneNumber: user.phoneNumber,
      address: user.address,
      identity: user.identity,
      dob: user.dob,
      isDeleted: user.isDeleted,
      hashedPassword: user.getHashedPassword(),
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    await UserModel.create(userData);
    return user;
  }

  async update(user: User): Promise<User> {
    await UserModel.findByIdAndUpdate(user.id, {
      name: user.name,
      email: user.email.toLowerCase(),
      phoneNumber: user.phoneNumber,
      address: user.address,
      identity: user.identity,
      dob: user.dob,
      isDeleted: user.isDeleted,
      hashedPassword: user.getHashedPassword(),
      role: user.role,
      updatedAt: user.updatedAt,
    }).exec();
    return user;
  }
}
