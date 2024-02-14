import { Client, Account, ID } from "appwrite";
import { conf } from "../conf";
import type { Register } from "../schemas/registerSchema";
import type { TLogin } from "../schemas/loginSchema";

class AuthService {
  client = new Client();

  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async register({ email, password, name }: Register) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (!user) throw new Error("User not created");
      return await this.login({ email, password });
    } catch (error) {
      const { message } = error as Error;
      throw new Error(`Appwrite service :: register :: Error : ${message}`);
    }
  }

  async login({ email, password }: TLogin) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      const { message } = error as Error;
      throw new Error(`Appwrite service :: login :: Error : ${message}`);
    }
  }

  async logout() {
    try {
      return { data: await this.account.deleteSessions(), sucess: true };
    } catch (error) {
      const { message } = error as Error;
      throw new Error(`Appwrite service :: logout :: Error : ${message}`);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Appwrite service :: getCurrentUser :: Error : ${message}`
      );
    }
  }
}

export const authService = new AuthService();
