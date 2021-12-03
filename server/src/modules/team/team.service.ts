import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team, TeamModel } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(@Inject(TeamModel.name) private teamModel: Model<Team>) {}

  create(createTeamInput: CreateTeamInput, userid: string): Promise<Team> {
    const createdTeam = new this.teamModel({ ...createTeamInput, userid });
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

  remove(id: string): boolean {
    try {
      this.teamModel.deleteOne({ id }).exec();
    } catch {
      return false;
    }

    return true;
  }
}
