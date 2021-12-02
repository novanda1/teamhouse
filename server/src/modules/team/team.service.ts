import { Injectable } from '@nestjs/common';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';

@Injectable()
export class TeamService {
  create(createTeamInput: CreateTeamInput) {
    return 'This action adds a new team';
  }

  findAll() {
    return `This action returns all team`;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamInput: UpdateTeamInput) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
