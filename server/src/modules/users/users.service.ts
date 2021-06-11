import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from './dto/user-inputs.dto';
import { User, UserDocument, UserResponse } from './schema/user.schema';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private users: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[] | undefined> {
    return await this.users.find().exec();
  }

  async create(
    @Args('options') options: CreateUserInput,
  ): Promise<UserResponse> {
    options.password = await argon2.hash(options.password);

    const usernameExist = await this.findOne(options.username);
    if (usernameExist) {
      return {
        errors: [
          {
            field: 'username',
            message: 'username already taken',
          },
        ],
      };
    }

    const user = await new this.users(options).save();

    return {
      user,
    };
  }

  async findOne(username: string): Promise<User> {
    return await this.users.findOne({ username });
  }

  async validateUser(input: LoginUserInput): Promise<UserResponse> {
    const user = await this.users.findOne({ username: input.username });

    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: "username doesn't exists",
          },
        ],
      };
    }

    const validPass = await argon2.verify(user.password, input.password);

    if (!validPass) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }

    return { user };
  }

  // async findById(id: string): Promise<User> {
  //   return await this.users.findById(id);
  // }

  // async findByIds(ids: string[] | User[]): Promise<User[]> {
  //   return await this.users.find({ _id: ids }).exec();
  // }

  async find(username: string): Promise<User> {
    return await this.users.findOne({ username });
  }

  async finds(usernames: string[]): Promise<User[]> {
    const result = [];
    usernames.map((u) => {
      const user = this.find(u);
      result.push(user);
    });

    return result;
  }

  async update(_id: string, options: UpdateUserInput): Promise<User> {
    await this.users.findOneAndUpdate({ _id }, { $set: options });
    return await this.users.findById(_id);
  }

  async search(query: string): Promise<User[]> {
    return await this.users.find({ $text: { $search: query } });
  }
}
