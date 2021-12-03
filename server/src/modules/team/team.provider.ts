import { Connection } from 'mongoose';
import { TeamSchema } from './entities/team.entity';

/** @todo
 Avoid magic string 
 Both CAT_MODEL and DATABASE_CONNECTION should be kept in the separated constants.ts file.
 */
export const teamsProviders = [
  {
    provide: 'TEAM_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Team', TeamSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
