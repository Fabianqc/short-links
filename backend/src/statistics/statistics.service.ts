import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';
import {  Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class StatisticsService {
}
