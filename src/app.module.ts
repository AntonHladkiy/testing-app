import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBModule } from './db/db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { configModuleConfig, getMongooseUriFromConfig } from './moduleConfigs';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: getMongooseUriFromConfig(configService),
        };
      },
    }),
    DBModule,
    UsersModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
