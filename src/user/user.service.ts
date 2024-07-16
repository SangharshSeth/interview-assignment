import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseQueryOptions } from 'mongoose';
import { User } from './user.schema';
import { SearchUserDto, UserDto } from 'src/dto/user.dto';
import { BlockedUser } from 'src/block/block.schema';
import Redis from 'ioredis';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(BlockedUser.name) private blockedUserModel: Model<BlockedUser>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) { }

  async createUser(userData: UserDto): Promise<User> {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async getUser(id: string): Promise<User | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      return user;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id: string, userData: UserDto): Promise<User | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return true;
  }

  async searchUsers(userInfo: SearchUserDto, currentUserId: string): Promise<User[] | null> {
    const { userName, minAge, maxAge } = userInfo;

    // Cache key based on search parameters and requesting user ID
    const cacheKey = `search:${currentUserId}:${JSON.stringify(userInfo)}`;

    // Check if the result is in cache
    const cachedResult = await this.redisClient.get(cacheKey);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }

    const blockedUserDoc = await this.blockedUserModel.findOne({ userId: currentUserId }).exec();
    const blockedUserIds = blockedUserDoc ? blockedUserDoc.blockedUserIds : [];

    let query: any = {
    }
    if (userName) {
      query.userName = userName;
    }

    if (minAge !== undefined) {
      query.age = query.age || {};
      query.age.$gte = Number(minAge);
    }

    if (maxAge !== undefined) {
      query.age = query.age || {};
      query.age.$lte = Number(maxAge);
    }

    if (blockedUserIds.length > 0) {
      query._id = { $nin: blockedUserIds };
    }

    const result = await this.userModel.find(query).exec();
    result.forEach((result) => {
      delete (result.__v)
    })
    await this.redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);
    return result;
  }
}
