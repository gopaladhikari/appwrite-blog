import { Client, Storage, Databases, Query, ID } from "appwrite";
import { conf } from "../conf";
import { CreatePostSchema } from "../schemas/createPostSchema";

type Post = CreatePostSchema & {
  userId: string;
};

class Service {
  client;
  bucket;
  database;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.bucket = new Storage(this.client);
    this.database = new Databases(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featureImage,
    status,
    userId,
  }: Post) {
    try {
      return this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { content, title, featureImage, status, userId }
      );
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(`Appwrite service :: createPost :: Error : ${message}`);
    }
  }

  async updatePost({ title, slug, content, featureImage, status }: Post) {
    try {
      return this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featureImage, status }
      );
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(`Appwrite service :: updatePost :: Error : ${message}`);
    }
  }
  async deletePost(slug: string) {
    try {
      return this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(`Appwrite service :: deletePost :: Error : ${message}`);
    }
  }

  async getAllPosts() {
    try {
      return this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(`Appwrite service :: getPosts :: Error : ${message}`);
    }
  }

  async getOnePost(slug: string) {
    try {
      return this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(`Appwrite service :: getOnePost :: Error : ${message}`);
    }
  }

  async getPostsByStatus(queries = [Query.equal("status", "published")]) {
    try {
      return this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(
        `Appwrite service :: getPostsByStatus :: Error : ${message}`
      );
    }
  }

  // File handling
  async uploadFile(file: File) {
    try {
      return this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(`Appwrite service :: uploadFile :: Error : ${message}`);
    }
  }

  async getFilePreview(fileId: string) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(
        `Appwrite service :: getFilePreview :: Error : ${message}`
      );
    }
  }

  async deleteFile(fileId: string) {
    try {
      return this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(`Appwrite service :: deleteFile :: Error : ${message}`);
    }
  }
}

export const service = new Service();
