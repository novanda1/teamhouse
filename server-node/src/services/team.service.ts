import { validate } from 'class-validator';
import { Model } from 'mongoose';
import {
  CreateTeamInputsDTO,
  UpdateTeamInputDTO,
} from '../lib/dto/TeamInput.dto';
import { Team, TeamDocument, TeamModel } from '../schema/team.schema';

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

  async find(id: string): Promise<Team | null> {
    return await this.model.findById(id);
  }

  async finds(limit: number): Promise<Team[]> {
    return await this.model.find().limit(limit).sort({ date: -1 }).exec();
  }

  async delete(id: string): Promise<boolean> {
    try {
      const deleted = await this.model.findByIdAndDelete(id);
      return deleted !== null;
    } catch {
      return false;
    }
  }

  async update(id: string, options: UpdateTeamInputDTO): Promise<Team | null> {
    await this.model.findByIdAndUpdate(id, options);
    return await this.find(id);
  }
}
