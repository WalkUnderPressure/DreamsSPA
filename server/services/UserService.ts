import BaseContext from '../BaseContext';
import { UserType } from '../models/User.model';

export default class UserService extends BaseContext{
    
    findUserByEmail(email: string){
        const { UserModel } = this.di;
        return UserModel.findOne({email});
    }
}