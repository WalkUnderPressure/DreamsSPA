import { asValue } from 'awilix';
import DreanModel, { DreanType } from './Drean.model';
import UserModel, {UserSchema, UserType} from "./User.model";

export interface IModelContainer {
    DreanModel: DreanType;
    UserModel: UserType;
}

export default {
    DreanModel: asValue(DreanModel),
    UserModel: asValue(UserModel)
}