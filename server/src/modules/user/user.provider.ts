import { Connection } from 'mongoose';
import { UserModel, UserSchema } from './entities/user.entity';

/** @todo
 Avoid magic string 
 Both CAT_MODEL and DATABASE_CONNECTION should be kept in the separated constants.ts file.
 */
export const usersProviders = [
  {
    provide: UserModel,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
