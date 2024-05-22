import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';
import { DATABASE_NAME, DATABASE_PORT } from '../configuration/model/database-configuration';
import { Task } from '../../task/task.entity';
import { User } from '../../user/user.entity';

@Module({
    imports: [
        ConfigurationModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationModule],
            inject: [ConfigurationService],
            useFactory: async (configService: ConfigurationService) => ({
                type: 'postgres',
                host: 'localhost',
                port: parseInt(configService.databaseConfig[DATABASE_PORT]),
                database: configService.databaseConfig[DATABASE_NAME],
                username: 'postgres',
                password: 'postgres',
                entities: [Task, User],
                synchronize: true,
            }),
        }),
    ],
})
export class DatabaseModule {}