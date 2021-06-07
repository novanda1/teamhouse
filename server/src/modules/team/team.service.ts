import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamInputsDTO, UpdateTeamInputDTO } from './dto/team-inputs.dto';
import { Team, TeamDocument } from './schema/team.schema';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private readonly model: Model<TeamDocument>,
  ) {}

  async create(options: CreateTeamInputsDTO): Promise<Team> {
    const team = await new this.model(options).save();
    return team;
  }

  async findAll(): Promise<Team[]> {
    return await this.model.find().exec();
  }

  async findById(id: string): Promise<Team> {
    const team = await this.model.findById(id);
    return team;
  }

  async update(id: string, options: UpdateTeamInputDTO): Promise<Team> {
    await this.model.findOneAndUpdate({ _id: id }, { $set: options });
    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    try {
      const deleted = await this.model.findOneAndDelete({ _id: id });
      return deleted !== null;
    } catch {
      return false;
    }
  }

  async addTeamMember(teamId: string, userId: string): Promise<Team> {
    const currentTeam = await this.model.findById(teamId);
    const currentTeamMembers = currentTeam.members;

    if (!currentTeamMembers.includes(userId)) currentTeamMembers.push(userId);

    await this.update(teamId, { members: currentTeamMembers });
    return await this.findById(teamId);
  }
}
