import { validate } from 'class-validator';
import { Model } from 'mongoose';
import { CreateUserDTO } from '../dto/userDTO';
import { UserResponse } from '../resolvers/userResolver';
import { User, UserDocument, UserModel } from '../schema/userSchema';

export class UserService {
  constructor(private userModel: Model<UserDocument> = UserModel) {}

  async create(options: CreateUserDTO): Promise<UserResponse> {
    return validate(options).then(async (errors): Promise<UserResponse> => {
      if (errors.length > 0) {
        return {
          errors: [
            ...errors.map((err) => {
              return {
                field: err.property,
                message:
                  err.constraints !== undefined
                    ? err.constraints[Object.keys(err.constraints)[0]] // get first val in obj
                    : '',
              };
            }),
          ],
        };
      } else {
        const user = await this.userModel.create({
          ...options,
        });
        user instanceof User;
        return { user };
      }
    });
  }
}
