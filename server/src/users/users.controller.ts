import { Controller, Get, Post, Param, UseGuards, Request, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':id/murmurs')
  async getUserMurmurs(@Param('id') id: string) {
    return this.usersService.getUserMurmurs(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  async follow(@Request() req, @Param('id') id: string) {
    return this.usersService.follow(req.user.id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/follow')
  async unfollow(@Request() req, @Param('id') id: string) {
    return this.usersService.unfollow(req.user.id, +id);
  }

  @Get(':id/followers')
  async getFollowers(@Param('id') id: string) {
    return this.usersService.getFollowers(+id);
  }

  @Get(':id/following')
  async getFollowing(@Param('id') id: string) {
    return this.usersService.getFollowing(+id);
  }
}
