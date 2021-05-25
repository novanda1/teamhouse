import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { User } from 'src/users/schema/user.schema';
import { GqlUser } from 'src/_shared/decorators';
import projectInputDTO from './dto/project-inputs.dto';
import { ProjectService } from './project.service';
import { Project } from './schema/project.schema';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project], { name: 'projects' })
  async findAll(@Args('limit') limit: number): Promise<Project[]> | null {
    return await this.projectService.findAll(limit);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Project, { name: 'createProject' })
  async create(
    @Args('options') options: projectInputDTO,
    @GqlUser() user: User,
  ): Promise<Project> {
    options.users = [user._id];
    return await this.projectService.create(options);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Boolean, { name: 'deleteProject' })
  async delete(@Args('id') id: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.projectService.delete(id);
      resolve(true);
    });
  }
}
