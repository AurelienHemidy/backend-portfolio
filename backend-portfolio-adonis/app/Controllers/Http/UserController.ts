import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UserController {
  public async createUser({ request }: HttpContextContract) {
    const email = request.body().email;
    const password = request.body().password;
    console.log(email);
    console.log(password);

    const isUserAlreadyExists = await User.findBy('email', email);

    if (isUserAlreadyExists) {
      return {
        error_message: `Error: User with email: '${email}' already exists`,
      };
    } else {
      await User.create({
        email: email,
        password: password,
      });
      return {
        validation_message: `Success: User with email ${email} created`,
      };
    }
  }

  public async loginUser({ response, request, auth }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');

    try {
      await auth.use('web').attempt(email, password);
      return {
        validation_message: `Success: User authenticated`,
      };
    } catch {
      return response.badRequest('Invalid credentials');
    }
  }

  public async logoutUser({ response, auth }: HttpContextContract) {
    try {
      await auth.use('web').logout();
      return {
        validation_message: `Success: User logged out`,
      };
    } catch {
      return response.badRequest('Invalid credentials');
    }
  }
}
