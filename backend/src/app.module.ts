import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EventlinksModule } from './eventlinks/eventlinks.module';
import { EventusersessionModule } from './eventusersession/eventusersession.module';
import { ShortlinksModule } from './shortlinks/shortlinks.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UsersHasShortlinksModule } from './users_has_shortlinks/users_has_shortlinks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    AuthModule,
    EventlinksModule,
    EventusersessionModule,
    ShortlinksModule,
    StatisticsModule,
    UsersHasShortlinksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
