import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/modules/users/schema/user.schema';

@ObjectType()
@Schema({ collection: 'refresh_tokens' })
export class RefreshToken {
  @Field()
  _id: string;

  @Field()
  @Prop({ unique: true })
  user_id: string;

  @Field(() => Boolean)
  @Prop()
  is_revoked: boolean;

  @Field(() => Date)
  @Prop({ type: Date })
  expires: Date;
}

export type RefreshTokenDocument = RefreshToken & Document;
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

@ObjectType()
class IsValidToken {
  @Field()
  accessTokenValid: boolean;
  @Field()
  refreshTokenValid: boolean;
}

@ObjectType()
export class MeQueryResponse {
  @Field({ nullable: true })
  user?: User;
  @Field()
  tokens: IsValidToken;
}
