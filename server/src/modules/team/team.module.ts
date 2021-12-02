import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { teamsProviders } from './team.provider';

@Module({
  imports: [DatabaseModule],
  providers: [TeamResolver, TeamService, ...teamsProviders]
})
export class TeamModule { }
