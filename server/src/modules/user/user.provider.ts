import { Connection } from 'mongoose';
import { UserModel, UserSchema } from './entities/user.entity';

export const usersProviders = [
  {
    provide: UserModel,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
