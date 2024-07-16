import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';


export type BlockedUserDocument = HydratedDocument<BlockedUser>;

@Schema()
export class BlockedUser extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [String], required: true })
  blockedUserIds: string[];
}

export const BlockedUserSchema = SchemaFactory.createForClass(BlockedUser);