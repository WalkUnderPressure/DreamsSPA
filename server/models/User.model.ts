import mongoose from 'mongoose';
import { prop, modelOptions, getModelForClass, DocumentType} from '@typegoose/typegoose';

@modelOptions({schemaOptions: {collection: 'users', versionKey: false }})
export class UserSchema {
    @prop()
    login: string;

    @prop()
    password: string;
}

export type UserType = mongoose.Model<DocumentType<UserSchema>, {}> & UserSchema;
export default getModelForClass(UserSchema);