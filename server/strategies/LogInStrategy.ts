// import { Request } from 'express';
// import passportLocal from 'passport-local';
// import { USER_ROLE } from '../../COMMON';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// // import { ConfirmRequestMethod } from '../../src/constants';

// import BaseContext from '../BaseContext';
// import { IContextContainer } from '../container';
// // import BaseModel from '../models/BaseModel';


// declare global {
//     namespace Express {
//         interface Request {
//             locale: any;
//         }
//     }
// }

// /**
//  * Return the Passport Local Strategy object.
//  */


// export default class LogInStrategy extends BaseContext {
//     private strategyUser: passportLocal.Strategy;

//     get strategy() {
//         return this.strategyUser;
//     }

//     constructor(opts: IContextContainer) {
//         super(opts);

//         this.verifyRequestUser = this.verifyRequestUser.bind(this);

//         this.strategyUser = new passportLocal.Strategy({
//             passwordField: 'password',
//             passReqToCallback: true,
//             usernameField: 'email',
//             session: false,

//         }, this.verifyRequestUser);
//     }

//     public async verifyRequestUser(req: Request, email: string, password: string, done: any) {
//         const { UserModel } = this.di;
        
//         const user = await UserModel.findOne({ email: email });
//         if (user) {
//             bcrypt.compare(password, user.password, (err, result) => {
//                 if(err){
//                     return done('Cant check passwords!');
//                 }else if(result) {
//                     return done(null, user);
//                 }else{
//                     return done(null, false);
//                 }
//             })
//         }else {
//             return done(null, false);
//         } 
//     }
// }
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passportLocal from 'passport-local';
import { UserType } from '../models/User.model';
import BaseContext from '../BaseContext';
import { IContextContainer } from '../container';
import config from '../../config';

/**
 * Return the Passport Local Strategy object.
 */

interface ILoginStrategyOptions {
    UserModel: UserType;
}


export default class LogInStrategy extends BaseContext {
    private strategyUser: passportLocal.Strategy;

    get strategy() {
        return this.strategyUser;
    }

    constructor(opts: IContextContainer) {
        super(opts);

        console.log('jwt: initialization Local-Login strategy');
        this.verifyRequestUser = this.verifyRequestUser.bind(this);

        this.strategyUser = new  passportLocal.Strategy({
            passwordField: 'password',
            passReqToCallback: true,
            usernameField: 'email',
            session: false,

        }, this.verifyRequestUser);
    }

    public async verifyRequestUser(req: Request, email: string, password: string, done: any) {

        console.log('verify user!')

        const { UserModel } = this.di;

        const user = await UserModel.findOne({ email: email });

        console.log("find user ", user);

        if (!user) {
            return done('Incorrect password');
        }
        if (!user.password) {
            return done('You are not registered on the site');
        }
        
        // if (user.banned) {
        // return done('Your account is banned. Please contact support.');
        // }

        // if (user.suspended) {
        // return done('Please verify your account via email that was sent to you or contact the website administrator.');
        // }
        
        let bcryptRes = await bcrypt.compare(password, user.password);
        if (!bcryptRes) {
            return done('Incorrect password');
        }

        const payload = {
            sub: user._id
        };
        const token = jwt.sign(payload, config.jwtSecret);
        user.token = token;
        user.save();
        
        const identity = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
        //const identity = user.initSession(req);
        return done(null, identity);
    }

}