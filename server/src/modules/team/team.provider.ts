import { Connection } from 'mongoose';
import { TeamModel, TeamSchema } from './entities/team.entity';

export const teamsProviders = [
  {
    provide: TeamModel.name,
    useFactory: (connection: Connection) =>
      connection.model('Team', TeamSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
