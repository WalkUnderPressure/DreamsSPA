import { Request } from 'express';
import passportLocal from 'passport-local';
import { USER_ROLE } from '../../COMMON';
// import { ConfirmRequestMethod } from '../../src/constants';

import BaseContext from '../BaseContext';
import { IContextContainer } from '../container';
// import BaseModel from '../models/BaseModel';


declare global {
    namespace Express {
        interface Request {
            locale: any;
        }
    }
}

/**
 * Return the Passport Local Strategy object.
 */


export default class SignUpStrategy extends BaseContext {
    private strategyUser: passportLocal.Strategy;

    get strategy() {
        return this.strategyUser;
    }

    constructor(opts: IContextContainer) {
        super(opts);

        this.verifyRequestUser = this.verifyRequestUser.bind(this);

        this.strategyUser = new passportLocal.Strategy({
            passwordField: 'password',
            passReqToCallback: true,
            usernameField: 'email',
            session: false,

        }, this.verifyRequestUser);
    }

    public async verifyRequestUser(req: Request, email: string, password: string, done: any) {
        const { UserModel } = this.di;

        console.log('email ', email);

        const user = await UserModel.findOne({ email: email });
        if (user) {
            console.log('find user cant registr ', user);
            return done('That e-mail already taken!');
        }
        const defaultTimezone = 'America/Edmonton';
        const { firstName, lastName, timezone, role } = req.body;

        let isRole: string = USER_ROLE.USER;

        //if (isAdminCreate && role) {
        //    isRole = role
        //}
        
        const userData = {
            email: email && email.trim(),
            password: password && password.trim(),
            firstName: firstName && firstName.trim(),
            lastName: lastName && lastName.trim(),
            timezone: timezone ? timezone.trim() : defaultTimezone,
            locale: req['locale'],
            role: isRole,
        };

        const newUser = new UserModel(userData);
        
        //var error = BaseModel.validate(newUser);
        //if (error) {
        //    return done(error);
        //}   

        newUser.save()
            .then((user: any) => {
                // if (!isAdminCreate) {
                // const reset = new ConfirmRequestModel();
                // reset.user = newUser;
                // reset.type = ConfirmRequestMethod.REGISTRATION;
                // reset.data = userData;
                // reset.save();
                // }

                // const ip = req.headers['x-forwarded-for'] ||
                //     req.connection.remoteAddress ||
                //     req.socket.remoteAddress || req.ip;

                // const ip_api = require('ip_api.co');
                // ip_api.location((res: any) => {
                //     console.log('IP info===>ip: ', ip, 'response from ip_api: ', res);
                //     let c = 'US';
                //     if (res.country) {
                //         c = res.country;
                //     }
                //     CountryModel.findOne({ cca2: c }, (err, data) => {
                //         if (data) {
                //             user.country = data;
                //             user.save();
                //             data.isActive = 1;
                //             data.save();
                //         }
                //     });
                // }, ip);

                return done(null, {
                    _id: user._id
                });
            })
            .catch((error: any) => {
                return done(error);
            });
    }
}