import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { RefreshToken, RefreshTokenDocument } from './schema/token.schema';

Injectable();
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly model: Model<RefreshTokenDocument>,
  ) {}

  public async createRefreshToken(
    user: User,
    ttl: number,
  ): Promise<RefreshToken> {
    const token = new this.model();

    token.user_id = user._id;
    token.is_revoked = false;

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    token.expires = expiration;

    try {
      return await token.save();
    } catch {
      // already
      return await this.model.findOneAndUpdate(
        { user_id: user._id },
        {
          $set: { expires: token.expires },
        },
      );
    }
  }

  public async findTokenByUserId(
    user_id: string,
  ): Promise<RefreshToken | null> {
    return this.model.findOne({ user_id });
  }
}
