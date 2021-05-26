import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamInputsDTO } from './dto/team-inputs.dto';
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
    return await this.model.findById(id);
  }
}
