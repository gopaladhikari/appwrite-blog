import { Client, Account, ID } from "appwrite";
import { conf } from "../conf";
import type { Register } from "../schemas/registerSchema";
import type { Login } from "../schemas/loginSchema";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteBucketId)
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
      return this.login({ email, password });
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(`Appwrite service :: register :: Error :${message}`);
    }
  }

  async login({ email, password }: Login) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(`Appwrite service :: login :: Error :${message}`);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(`Appwrite service :: logout :: Error :${message}`);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(
        `Appwrite service :: getCurrentUser :: Error :${message}`
      );
    }
  }
}

export const authService = new AuthService();
