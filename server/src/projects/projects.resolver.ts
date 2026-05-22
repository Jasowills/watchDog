import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ProjectModel } from './models/project.model';
import { CreateProjectInput, UpdateProjectInput } from './projects.inputs';
import { ProjectsService } from './projects.service';

@Resolver(() => ProjectModel)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => [ProjectModel])
  projects(
    @Args('workspaceSlug', { type: () => String, nullable: true })
    workspaceSlug?: string,
  ): Promise<ProjectModel[]> {
    return this.projectsService.findAll(workspaceSlug);
  }

  @Mutation(() => ProjectModel)
  createProject(
    @Args('input') input: CreateProjectInput,
  ): Promise<ProjectModel> {
    return this.projectsService.create(input);
  }

  @Mutation(() => ProjectModel)
  updateProject(
    @Args('input') input: UpdateProjectInput,
  ): Promise<ProjectModel> {
    return this.projectsService.update(input);
  }

  @Mutation(() => Boolean)
  deleteProject(@Args('id') id: string): Promise<boolean> {
    return this.projectsService.remove(id);
  }
}
