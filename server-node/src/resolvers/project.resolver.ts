import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { ProjectInputDTO } from '../lib/dto/projectInput.dto';
import { Project } from '../schema/project.schema';
import { ProjectService } from '../services/project.service';

@Resolver()
export class ProjectResolver {
  constructor(private readonly service = new ProjectService()) {}

  @Mutation(() => Project, { name: 'createProject' })
  async create(
    @Arg('options') options: ProjectInputDTO,
    @Arg('team_id') team_id: string,
  ): Promise<Project | null> {
    return await this.service.create(options, team_id);
  }

  @Query(() => [Project], { name: 'projects' })
  async projects(@Arg('limit', () => Int) limit: number) {
    return await this.service.projects(limit);
  }
}
