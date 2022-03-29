import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Project from 'App/Models/Project';

export default class ProjectController {
  public async getAllProjects() {
    return Project.query().select('*');
  }

  public async getProjectByID({ params }: HttpContextContract) {
    const id = params.id;
    return Project.find(id);
  }

  public async createProject({ request, response }: HttpContextContract) {
    const projectSchema = schema.create({
      name: schema.string(),
    });

    if (await request.validate({ schema: projectSchema })) {
      response.status(200);
      await Project.create({
        name: request.body().name,
      });
      return {
        validation_message: `Project with name '${
          request.body().name
        }' has been updated successfully`,
      };
    } else {
      response.status(400);
      return {
        error_message: 'Error: Incorrect fields',
      };
    }
  }

  public async updateProjectByID({ request, response, params }: HttpContextContract) {
    const projectSchema = schema.create({
      name: schema.string(),
    });

    if (await request.validate({ schema: projectSchema })) {
      response.status(200);

      // await Database.from('projects').where('id', params.id).update({
      //   name: request.body().name,
      // });

      await Project.query().where('id', params.id).update({
        name: request.body().name,
      });

      return {
        validation_message: `Project ${params.id} has been updated successfully`,
      };
    } else {
      response.status(400);
      return {
        error_message: `Project ${params.id} doesn't exists`,
      };
    }
  }

  public async deleteProjectByID({ params, response }: HttpContextContract) {
    const id = params.id;

    const projectToUpdate = await Project.findByOrFail('id', id);

    if (projectToUpdate) {
      response.status(200);
      await Project.query().where('id', id).delete();
      return {
        validation_message: `Project ${id} has been deleted successfully`,
      };
    } else {
      response.status(400);
      return {
        error_message: `Project ${id} doesn't exists`,
      };
    }
  }
}
