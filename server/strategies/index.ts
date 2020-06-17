import { asClass } from 'awilix';
import SignUpStrategy from './SignUpStrategy';
import LogOutStrategy from './LogOutStrategy';
import LogInStrategy from './LogInStrategy';
import JWTStrategy from './JWTStrategy';

export interface IStrategiesContainer {
    SignUpStrategy : SignUpStrategy;
    LogOutStrategy: LogOutStrategy;
    LogInStrategy: LogInStrategy;
    JWTStrategy: JWTStrategy;
}

export default {
    SignUpStrategy: asClass(SignUpStrategy),
    LogOutStrategy: asClass(LogOutStrategy),
    LogInStrategy: asClass(LogInStrategy),
    JWTStrategy: asClass(JWTStrategy)
}