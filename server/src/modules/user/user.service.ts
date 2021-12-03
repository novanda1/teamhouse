import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserModel } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject(UserModel) private userModel: Model<User>) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({ id }).exec();
  }

  update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    return this.userModel.findOneAndUpdate({ id }, updateUserInput).exec();
  }

  remove(id: string): boolean {
    try {
      this.userModel.deleteOne({ id }).exec();
    } catch {
      return false;
    }

    return true;
  }
}
