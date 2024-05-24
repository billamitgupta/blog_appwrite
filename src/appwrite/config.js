import conf from '../conf.js'
import { Client, Databases, ID, Storage, Query } from 'appwrite'

export class Service {
    client = new Client();
    database;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, content, featuredimage, status, userId }) {
        try {
            return this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId,
                    // createdAt: new Date().toISOString(),

                }
            )

        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredimage,
                status
            }
            )
        } catch (error) {
            throw error;
        }

    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,)
            return true;
        } catch (error) {
            console.log("Appwirie service :: deletepost")
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch {
            console.log("Appwirie service :: getpost")
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, queries
            )
        } catch (error) {
            console.log("Apprite getposts:: error")
            return false;
        }
    }
    async uploadFile(file) {
        try {

            return await this.bucket.createFile(conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwirie service :: upload file")
            throw error;
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
            return true;
        } catch (error) {
            console.log("Appwirie service :: deletefile")
            throw false;
        }
    }
    getFilePreview(fileId) {
        try {
             return this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
        }catch{
            console.log("file preview fail")
        }
    }
    

}

const service = new Service();
export default service