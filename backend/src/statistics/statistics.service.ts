import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';
import { Repository } from 'typeorm';
import { CreateStatisticDto } from './dto/create-statistic.dto';

@Injectable()
export class StatisticsService {

    constructor(
        @InjectRepository(Statistic)
        private statisticRepository: Repository<Statistic>,
    ) { }

    async createStatistic(createStatisticDto: CreateStatisticDto) {
        const statistic = this.statisticRepository.create(createStatisticDto);
        return this.statisticRepository.save(statistic);
    }
}
