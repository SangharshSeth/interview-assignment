import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlockedUser } from './block.schema';

@Injectable()
export class BlockService {
    constructor(@InjectModel(BlockedUser.name) private blockedUserModel: Model<BlockedUser>) {}

    async blockUsers(userId: string, blockedUserIds: string[]): Promise<void> {
        const block = await this.blockedUserModel.findOne({ userId }).exec();
        if (block) {
          block.blockedUserIds.push(...blockedUserIds);
          block.blockedUserIds = Array.from(new Set(block.blockedUserIds)); // Ensure uniqueness
          await block.save();
        } else {
          const newBlock = new this.blockedUserModel({ userId, blockedUserIds });
          await newBlock.save();
        }
      }
    
      async unblockUsers(userId: string, blockedUserIds: string[]): Promise<void> {
        const block = await this.blockedUserModel.findOne({ userId }).exec();
        if (!block) {
          throw new NotFoundException(`No blocked users found for user with id ${userId}`);
        }
    
        block.blockedUserIds = block.blockedUserIds.filter(id => !blockedUserIds.includes(id));
        if (block.blockedUserIds.length === 0) {
          await this.blockedUserModel.deleteOne({ userId }).exec();
        } else {
          await block.save();
        }
      }
}
