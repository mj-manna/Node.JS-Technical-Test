import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { MurmursService } from './murmurs.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('murmurs')
export class MurmursController {
  constructor(private readonly murmursService: MurmursService) { }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.murmursService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.murmursService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/murmurs')
  async create(@Request() req, @Body() createMurmurDto: CreateMurmurDto) {
    return this.murmursService.create(req.user.id, createMurmurDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/murmurs/:id')
  async remove(@Request() req, @Param('id') id: string) {
    return this.murmursService.remove(req.user.id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async like(@Request() req, @Param('id') id: string) {
    return this.murmursService.like(req.user.id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  async unlike(@Request() req, @Param('id') id: string) {
    return this.murmursService.unlike(req.user.id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('timeline/me')
  async getTimeline(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.murmursService.getTimeline(req.user.id, page, limit);
  }
}