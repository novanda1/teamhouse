import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(@Inject('TEAM_MODEL') private teamModel: Model<Team>) {}

  create(createTeamInput: CreateTeamInput): Promise<Team> {
    const createdTeam = new this.teamModel(createTeamInput);
    return createdTeam.save();
  }

  findAll(): Promise<Team[]> {
    return this.teamModel.find().exec();
  }

  findOne(id: string): Promise<Team> {
    return this.teamModel.findById(id).exec();
  }

  update(id: string, updateTeamInput: UpdateTeamInput): Promise<Team> {
    return this.teamModel.findOneAndUpdate({ id }, updateTeamInput).exec();
  }

  remove(id: string): Promise<Team> {
    return this.teamModel.findOneAndRemove({ id }).exec();
  }
}
