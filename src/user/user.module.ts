import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { VerifMailService } from '../verifMail.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, VerifMailService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}