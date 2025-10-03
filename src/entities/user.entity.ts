import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { BaseEntity } from './base.entity';
import {
  EntityInputValidationError,
  EntityValidationError,
} from './entity.errors';
import bcrypt from 'node_modules/bcryptjs';
import { validateOrThrow } from '@/shared/validator';
import { env } from '@/config/environment';

export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

// Define CreateUserDto
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  identity?: string;

  @IsOptional()
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

// Define HydrateUserDto
export class HydrateUserDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  hashedPassword: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  identity?: string;

  @IsOptional()
  @IsDate()
  dob?: Date;

  @IsBoolean()
  isDeleted: boolean;

  @IsEnum(Role)
  role: Role;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class UpdateUserDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  identity?: string;

  @IsOptional()
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

// Define User
export class User extends BaseEntity {
  // Properties that are specific to User entity
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public name: string | null;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsOptional()
  @IsString()
  public phoneNumber: string | null;

  @IsOptional()
  @IsString()
  public address: string | null;

  @IsOptional()
  @IsString()
  public identity: string | null;

  @IsOptional()
  @IsDate()
  public dob: Date | null;

  @IsBoolean()
  public isDeleted: boolean;

  @IsEnum(Role)
  public role: Role;

  private readonly hashedPassword: string;

  // Constructor that initializes specific properties
  protected constructor(
    props: Partial<User> & {
      email: string;
      hashedPassword: string;
      role: Role;
      isDeleted: boolean;
    },
  ) {
    super(props);
    this.name = props.name ?? null;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber ?? null;
    this.address = props.address ?? null;
    this.identity = props.identity ?? null;
    this.dob = props.dob ?? null;
    this.isDeleted = props.isDeleted;
    this.hashedPassword = props.hashedPassword;
    this.role = props.role;
  }

  // Get hashedPassword
  public getHashedPassword(): string {
    return this.hashedPassword;
  }

  // Validate
  public async validate(): Promise<void> {
    await validateOrThrow(this, User, EntityValidationError);
  }

  // Factory method to create a new user
  public static async create(props: CreateUserDto): Promise<User> {
    await validateOrThrow(props, CreateUserDto, EntityInputValidationError);
    const userProps = {
      ...props,
      hashedPassword: await bcrypt.hash(
        props.password,
        Number(env.BCRYPT_ROUNDS),
      ),
      isDeleted: false,
      role: props.role ?? Role.STUDENT,
    };
    return new User(userProps);
  }

  // Factory method to hydrate a user from existing props
  public static async hydrate(props: HydrateUserDto): Promise<User> {
    await validateOrThrow(props, HydrateUserDto, EntityInputValidationError);
    return new User(props);
  }

  // Verify password
  public verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.hashedPassword);
  }

  // toJSON
  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      identity: this.identity,
      dob: this.dob,
      isDeleted: this.isDeleted,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
