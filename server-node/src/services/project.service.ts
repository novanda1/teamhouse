import { validate } from 'class-validator';
import { ProjectInputDTO } from '../lib/dto/projectInput.dto';
import {
  Project,
  ProjectModel,
  ProjectTeamRef,
  ProjectTeamRefModel,
} from '../schema/project.schema';

export class ProjectService {
  constructor(
    private readonly model = ProjectModel,
    private readonly relationalModel = ProjectTeamRefModel,
  ) {}

  async create(
    options: ProjectInputDTO,
    team_id: string,
  ): Promise<Project | null> {
    return validate(options).then(
      async (errors: any): Promise<Project | null> => {
        if (errors.length > 0) {
          console.log(`errors`, errors);
          return null;
        } else {
          const project = await this.model.create({ ...options });
          project instanceof Project;

          const relational = await this.relationalModel.create({
            team_id,
            project_id: project._id,
          });
          relational instanceof ProjectTeamRef;

          return project;
        }
      },
    );
  }
}
