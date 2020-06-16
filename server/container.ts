import * as awilix from 'awilix';
import coreConfig from '../config';
import modelContainer, { IModelContainer } from './models';
import servicesContainer, {IServicesContainer} from './services';
import strategiesContainer, {IStrategiesContainer} from './strategies';
import passport, { PassportStatic } from 'passport';

export const passportFunc = (ctx: IContextContainer) => {
    passport.use('local-login', ctx.LogInStrategy.strategy);
    passport.use('local-signup', ctx.SignUpStrategy.strategy);
    // passport.use(ctx.jwtStrategy.strategy);
    return passport;
};

export interface IContextContainer extends IModelContainer,IServicesContainer, IStrategiesContainer  {
    config: any;
    passport: PassportStatic;
}

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    ...modelContainer,
    ...servicesContainer,
    ...strategiesContainer,
    config: awilix.asValue(coreConfig),
    passport: awilix.asFunction(passportFunc).singleton()
});

export default container;

