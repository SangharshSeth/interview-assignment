import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    versionKey: false
  }
}
)
export class User extends Document {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, unique: true, index: true, required: true })
  userName: string;

  @Prop({ type: String, required: true })
  dateOfBirth: string;

  @Prop({ type: Number })
  age: number;

}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ userName: 1 }, { unique: true });

export { UserSchema };