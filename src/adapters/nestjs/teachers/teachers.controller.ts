import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { GetTeachersUseCase, AddTeacherUseCase } from '@/application/use-cases';
import { CreateTeacherDto } from '@/entities';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard';
import { Role } from '@/entities';
import { Roles } from '../auth/roles.decorator';

@Controller('teachers')
export class TeachersController {
  constructor(
    private readonly getTeachersUseCase: GetTeachersUseCase,
    private readonly addTeacherUseCase: AddTeacherUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAll() {
    return await this.getTeachersUseCase.execute();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async add(@Body() dto: CreateTeacherDto) {
    return await this.addTeacherUseCase.execute(dto);
  }
}
