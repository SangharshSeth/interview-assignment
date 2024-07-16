import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { BlockedUser, BlockedUserSchema } from 'src/block/block.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  },
  {
    name: BlockedUser.name,
    schema: BlockedUserSchema
  }
]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
