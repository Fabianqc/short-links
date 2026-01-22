import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShortlinksService } from './shortlinks.service';


@Controller('shortlinks')
export class ShortlinksController {
  constructor(private readonly shortlinksService: ShortlinksService) {}
}
