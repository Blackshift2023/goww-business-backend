import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/auth.guard';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    isArray: false,
    schema: {
      example: {
        email: 'john.smith@gmail.com',
        role: 'patient',
        company_name: 'test',
        status: true,
        deleted_at: null,
        id: 0,
        created_at: '2023-05-29T09:24:58.517Z',
        updated_at: '2023-05-29T09:24:58.517Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(createUserDto);
  }
  

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
