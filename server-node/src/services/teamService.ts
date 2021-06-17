import { validate } from 'class-validator';
import { Model } from 'mongoose';
import {
  CreateTeamInputsDTO,
  CreateTeamRefInputsDTO,
} from '../lib/dto/TeamInputDTO';
import {
  Team,
  TeamDocument,
  TeamModel,
  TeamRef,
  TeamRefDocument,
  TeamRefModel,
} from '../schema/teamSchema';

export class TeamService {
  constructor(private model: Model<TeamDocument> = TeamModel) {}

  async create(options: CreateTeamInputsDTO): Promise<Team | null> {
    return validate(options).then(async (errors): Promise<Team | null> => {
      if (errors.length > 0) {
        console.log(`errors`, errors);
        return null;
      } else {
        const team = await this.model.create({ ...options });
        team instanceof Team;
        return team;
      }
    });
  }
}

export class TeamRefService {
  constructor(private readonly model: Model<TeamRefDocument> = TeamRefModel) {}

  async addRef(options: CreateTeamRefInputsDTO): Promise<TeamRef> {
    const team = await this.model.create(options);
    team instanceof Team;
    return team;
  }
}
