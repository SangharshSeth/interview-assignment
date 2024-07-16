import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { BlockedUser, BlockedUserSchema } from './block.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: BlockedUser.name,
    schema: BlockedUserSchema
  }]),
  AuthModule
],
  controllers: [BlockController],
  providers: [BlockService]
})
export class BlockModule {}
