import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import projectInputDTO from './dto/project-inputs.dto';
import { Project, ProjectDocument } from './schema/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly model: Model<ProjectDocument>,
  ) {}

  async create(options: projectInputDTO): Promise<Project> {
    const user = await new this.model(options).save();
    return user;
  }

  async findAll(limit: number): Promise<Project[]> | undefined {
    return await this.model.find().limit(limit).exec();
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}
