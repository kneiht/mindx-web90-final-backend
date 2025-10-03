import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  GetTeacherPositionsUseCase,
  AddTeacherPositionUseCase,
} from '@/application/use-cases';
import { CreateTeacherPositionDto } from '@/entities';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard';
import { Role } from '@/entities';
import { Roles } from '../auth/roles.decorator';

@Controller('teacher-positions')
export class TeacherPositionsController {
  constructor(
    private readonly getTeacherPositionsUseCase: GetTeacherPositionsUseCase,
    private readonly addTeacherPositionUseCase: AddTeacherPositionUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAll() {
    return await this.getTeacherPositionsUseCase.execute();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async add(@Body() dto: CreateTeacherPositionDto) {
    return await this.addTeacherPositionUseCase.execute(dto);
  }
}
