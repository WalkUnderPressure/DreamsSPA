import * as awilix from 'awilix';
import { Request } from 'express';
import coreConfig from '../config';
import modelContainer, { IModelContainer } from './models';
import servicesContainer, {IServicesContainer} from './services';
import strategiesContainer, {IStrategiesContainer} from './strategies';
import passport, { PassportStatic } from 'passport';
import { IIdentity, USER_ROLE } from 'COMMON';
import { UserSchema, UserType } from '../server/models/User.model';

const passportFunc = (ctx: IContextContainer) => {
    passport.use('local-login', ctx.LogInStrategy.strategy);
    passport.use('local-logout', ctx.LogOutStrategy.strategy);
    passport.use('local-signup', ctx.SignUpStrategy.strategy);
    passport.use('local-jwt',ctx.JWTStrategy.strategy);
    return passport;
};

const initSession = (ctx: IContextContainer) => (req: Request, user: UserSchema): IIdentity => {
    console.log('XXXXXXX INIT xXXXXXXXXXXX', user);
    // const isSuperRole = SUPER.includes(user.role);
    const identity: IIdentity = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        token: user.token,
        // current: null,
        // secrets: [],
        // locale: user.locale,
    };
    
    // req.session.isNeedReload = false;
    req.session.updatedAt = Date.now();
    req.session.identity = identity;
    
    return identity;
}

export interface IContextContainer extends IModelContainer,IServicesContainer, IStrategiesContainer  {
    config: any;
    passport: PassportStatic;
    initSession: (req: Request, user: UserSchema) => IIdentity;
}

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    ...modelContainer,
    ...servicesContainer,
    ...strategiesContainer,
    config: awilix.asValue(coreConfig),
    passport: awilix.asFunction(passportFunc).singleton(),
    initSession: awilix.asFunction(initSession).singleton(),
});

export default container;

