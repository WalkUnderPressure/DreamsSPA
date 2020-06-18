import mongoose from 'mongoose';
import { pre, prop, modelOptions, getModelForClass, DocumentType} from '@typegoose/typegoose';
import bcrypt from 'bcrypt';
import {USER_ROLE} from '../../COMMON';
@pre<UserSchema>("save", function (next) { // or @pre(this: Car, 'save', ...
    
    if (this._id === undefined || this._id === null) {
        this._id = mongoose.Types.ObjectId();
    }

    this.updatedAt = Date.now();
    if (this.isNew) {
        this.createdAt = Date.now();
    }

    //!!! the following lines of the code have to be last in the SAVE callback
    //!!! --------------------------------------------------------------------
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 10, (hashError: Error, encrypted: string) => {
        if (hashError) {
            return next(hashError);
        }

        // replace a password string with hash value
        this.password = encrypted;

        return next();
    });
    //!!! --------------------------------------------------------------------

})

@modelOptions({schemaOptions: {collection: 'users', versionKey: false }})
export class UserSchema {
    
    public _id: mongoose.Schema.Types.ObjectId;
    //@prop()
    //_id?: mongoose.Types.ObjectId;

    @prop()
    role: USER_ROLE;

    @prop()
    firstName: string;

    @prop()
    lastName: string;

    @prop()
    email: string;

    @prop()
    timezone: string;

    @prop()
    locale: string;

    @prop()
    lastAction: number;

    @prop()
    createdAt: number;

    @prop()
    updatedAt: number;

    @prop()
    password: string;

    @prop()
    token: string;
}

export type UserType = mongoose.Model<DocumentType<UserSchema>, {}> & UserSchema;
export default getModelForClass(UserSchema);