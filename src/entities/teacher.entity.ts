import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BaseEntity } from './base.entity';
import {
  EntityInputValidationError,
  EntityValidationError,
} from './entity.errors';
import { validateOrThrow } from '@/shared/validator';

// Define degree object
export class Degree {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  school: string;

  @IsString()
  @IsNotEmpty()
  major: string;

  @IsNumber()
  year: number;

  @IsBoolean()
  isGraduated: boolean;
}

// Define CreateTeacherDto
export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

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
  @Type(() => Date)
  dob?: Date;

  @IsUUID()
  @IsNotEmpty()
  orgUserId: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  teacherPositions?: string[];

  @IsOptional()
  @IsArray()
  degrees?: Degree[];
}

// Define HydrateTeacherDto
export class HydrateTeacherDto {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  orgUserId?: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isDeleted: boolean;

  @IsString()
  code: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsArray()
  @IsUUID(undefined, { each: true })
  teacherPositions: string[];

  @IsArray()
  degrees: Degree[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

// Define UpdateTeacherDto
export class UpdateTeacherDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  teacherPositions?: string[];

  @IsOptional()
  @IsArray()
  degrees?: Degree[];
}

// Define Teacher
export class Teacher extends BaseEntity {
  @IsUUID()
  public userId: string;

  @IsOptional()
  @IsUUID()
  public orgUserId?: string;

  @IsBoolean()
  public isActive: boolean;

  @IsBoolean()
  public isDeleted: boolean;

  @IsString()
  public code: string;

  @IsOptional()
  @IsDate()
  public startDate?: Date;

  @IsOptional()
  @IsDate()
  public endDate?: Date;

  @IsArray()
  @IsUUID(undefined, { each: true })
  public teacherPositions: string[];

  @IsArray()
  public degrees: Degree[];

  // Constructor
  protected constructor(
    props: Partial<Teacher> & {
      userId: string;
      orgUserId?: string;
      isActive: boolean;
      isDeleted: boolean;
      code: string;
      teacherPositions: string[];
      degrees: Degree[];
    },
  ) {
    super(props);
    this.userId = props.userId;
    this.orgUserId = props.orgUserId ?? '';
    this.isActive = props.isActive;
    this.isDeleted = props.isDeleted;
    this.code = props.code;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.teacherPositions = props.teacherPositions;
    this.degrees = props.degrees;
  }

  // Validate
  public async validate(): Promise<void> {
    await validateOrThrow(this, Teacher, EntityValidationError);
  }

  // Factory method to create a new teacher
  public static async create(
    props: CreateTeacherDto & { userId: string },
  ): Promise<Teacher> {
    await validateOrThrow(props, CreateTeacherDto, EntityInputValidationError);
    const teacherProps = {
      ...props,
      isActive: props.isActive ?? true,
      isDeleted: false,
      teacherPositions: props.teacherPositions ?? [],
      degrees: props.degrees ?? [],
      // Generate epoch time (milliseconds) code
      code: Date.now().toString(),
    };
    return new Teacher(teacherProps);
  }

  // Factory method to hydrate a teacher from existing props
  public static async hydrate(props: HydrateTeacherDto): Promise<Teacher> {
    await validateOrThrow(props, HydrateTeacherDto, EntityInputValidationError);
    return new Teacher(props);
  }

  // toJSON
  public toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      orgUserId: this.orgUserId || null,
      isActive: this.isActive,
      isDeleted: this.isDeleted,
      code: this.code,
      startDate: this.startDate,
      endDate: this.endDate,
      teacherPositions: this.teacherPositions,
      degrees: this.degrees,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
