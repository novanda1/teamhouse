import * as mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_URL),
  },
];
