import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GetTeachersUseCase, AddTeacherUseCase } from '@/application/use-cases';
import { CreateTeacherDto } from '@/entities';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard';
import { Role } from '@/entities';
import { Roles } from '../auth/roles.decorator';
import { UserInRequest } from '../auth/auth.dto';

@Controller('teachers')
export class TeachersController {
  constructor(
    private readonly getTeachersUseCase: GetTeachersUseCase,
    private readonly addTeacherUseCase: AddTeacherUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAll(@Request() req: { user: UserInRequest }) {
    return await this.getTeachersUseCase.execute(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async add(
    @Body() dto: CreateTeacherDto,
    @Request() req: { user: UserInRequest },
  ) {
    const teacherDto = { ...dto, orgUserId: req.user.id };
    return await this.addTeacherUseCase.execute(teacherDto);
  }
}
