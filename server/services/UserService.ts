import BaseContext from '../BaseContext';
import { UserType } from '../models/User.model';

export default class UserService extends BaseContext{
    
    getUserByID (id: string) {
        const { UserModel } = this.di;
        return UserModel.findById(id);
    }

    findUserByEmail(email: string){
        const { UserModel } = this.di;
        return UserModel.findOne({email});
    }

    async updateUserProfile(userId: string, userData: any){
        const { UserModel } = this.di;
        const user = await UserModel.findById(userId);
        
        Object.keys(userData).forEach((key: any) => {
            user[key] = userData[key];
        });
        
        return user.save();
    }

    createUser(user: UserType){
        const { UserModel } = this.di;
        const newUser = new UserModel(user);
        return newUser.save();
    }

    async deleteUserByID(id: string){
        const { DreansService, UserModel } = this.di;
        const deleted = await DreansService.deleteDreansWithRemovingUser(id)
        return UserModel.findByIdAndRemove(id);
    }

    getAllUsers(){
        const { UserModel } = this.di;
        return UserModel.find();
    }
}