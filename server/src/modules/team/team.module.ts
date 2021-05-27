import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { Team, TeamSchema } from './schema/team.schema';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamSchema,
      },
    ]),
    UsersModule,
  ],
  providers: [TeamResolver, TeamService],
})
export class TeamModule {}
