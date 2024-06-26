import conf from '../conf.js'
import {Account, Client, ID} from "appwrite"

export class AuthServices{
    client  = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount ({email, password, name}){
        try{
           const userAccount =  await this.account.create(ID.unique(),email,password,name);
           if(userAccount){
            //call another method
            return this.login({email,password});
           }else{
            return userAccount
           }
        }catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
     
     } catch (error) {
         throw error;
     }
     return null;
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("APPWRITE service:: logout")
            throw error
        }
    }
}

const authServices = new AuthServices();
export default authServices