import { Request } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passportLocal from 'passport-local';
import { UserType } from '../models/User.model';
import BaseContext from '../BaseContext';
import { IContextContainer } from '../container';
import config from '../../config';

interface ILoginStrategyOptions {
    UserModel: UserType;
}

export default class LogOutStrategy extends BaseContext {
    private strategyUser: passportLocal.Strategy;

    get strategy() {
        return this.strategyUser;
    }

    constructor(opts: IContextContainer) {
        super(opts);

        console.log('jwt: initialization Local-Logout strategy');
        this.verifyRequestUser = this.verifyRequestUser.bind(this);

        this.strategyUser = new  passportLocal.Strategy({
            passwordField: 'password',
            passReqToCallback: true,
            usernameField: 'email',
            session: false,

        }, this.verifyRequestUser);
    }

    public async verifyRequestUser(req: Request, email: string, password: string, done: any) {
        const { UserModel } = this.di;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return done('Incorrect user!');
        }
        
        user.save();

        const identity = {
            email: email
        }
        return done(null, identity);
    }

}