import { model, Model } from 'mongoose';
import { CreateUserDTO } from '../dto/userDTO';
import { User, UserDocument, UserSchema } from '../schema/user';

export class UserService {
  constructor(
    private userModel: Model<UserDocument> = model(User.name, UserSchema),
  ) {}

  async create(options: CreateUserDTO): Promise<User | null> {
    const user = await this.userModel.create({
      name: 'yes',
    });
    user instanceof User;
    // const user = await this.userModel.findOne({ email: options.email });

    return user;
  }
}
