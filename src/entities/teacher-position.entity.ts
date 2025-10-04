import {
  IsBoolean,
  IsDate,
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
import { validateOrThrow } from '@/shared/validator';

// Define CreateTeacherPositionDto
export class CreateTeacherPositionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsUUID()
  @IsNotEmpty()
  orgUserId: string;
}

// Define HydrateTeacherPositionDto
export class HydrateTeacherPositionDto {
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(2)
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isDeleted: boolean;

  @IsOptional()
  @IsUUID()
  orgUserId?: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

// Define UpdateTeacherPositionDto
export class UpdateTeacherPositionDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @IsOptional()
  @IsUUID()
  orgUserId?: string;
}

// Define TeacherPosition
export class TeacherPosition extends BaseEntity {
  @IsString()
  @MinLength(3)
  public name: string;

  @IsString()
  @MinLength(2)
  public code: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsBoolean()
  public isActive: boolean;

  @IsBoolean()
  public isDeleted: boolean;

  @IsOptional()
  @IsUUID()
  public orgUserId?: string;

  // Constructor
  protected constructor(
    props: Partial<TeacherPosition> & {
      name: string;
      code: string;
      isActive?: boolean;
      isDeleted: boolean;
      orgUserId?: string;
    },
  ) {
    super(props);
    this.name = props.name;
    this.code = props.code;
    this.description = props.description;
    this.isActive = props.isActive ?? true;
    this.isDeleted = props.isDeleted;
    this.orgUserId = props.orgUserId ?? '';
  }

  // Validate
  public async validate(): Promise<void> {
    await validateOrThrow(this, TeacherPosition, EntityValidationError);
  }

  // Factory method to create a new teacher position
  public static async create(
    props: CreateTeacherPositionDto,
  ): Promise<TeacherPosition> {
    await validateOrThrow(
      props,
      CreateTeacherPositionDto,
      EntityInputValidationError,
    );
    const positionProps = {
      ...props,
      isActive: props.isActive ?? true,
      isDeleted: false,
    };
    return new TeacherPosition(positionProps);
  }

  // Factory method to hydrate a teacher position from existing props
  public static async hydrate(
    props: HydrateTeacherPositionDto,
  ): Promise<TeacherPosition> {
    await validateOrThrow(
      props,
      HydrateTeacherPositionDto,
      EntityInputValidationError,
    );
    return new TeacherPosition(props);
  }

  // toJSON
  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      description: this.description,
      isActive: this.isActive,
      isDeleted: this.isDeleted,
      orgUserId: this.orgUserId || null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
