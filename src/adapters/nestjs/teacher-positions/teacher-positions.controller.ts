import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  GetTeacherPositionsUseCase,
  AddTeacherPositionUseCase,
} from '@/application/use-cases';
import { CreateTeacherPositionDto } from '@/entities';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard';
import { Role } from '@/entities';
import { Roles } from '../auth/roles.decorator';
import { UserInRequest } from '../auth/auth.dto';

@Controller('teacher-positions')
export class TeacherPositionsController {
  constructor(
    private readonly getTeacherPositionsUseCase: GetTeacherPositionsUseCase,
    private readonly addTeacherPositionUseCase: AddTeacherPositionUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAll(@Request() req: { user: UserInRequest }) {
    return await this.getTeacherPositionsUseCase.execute(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async add(
    @Body() dto: CreateTeacherPositionDto,
    @Request() req: { user: UserInRequest },
  ) {
    const positionDto = { ...dto, orgUserId: req.user.id };
    return await this.addTeacherPositionUseCase.execute(positionDto);
  }
}
