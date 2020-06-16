import { asClass } from 'awilix';
import SignUpStrategy from './SignUpStrategy';
import LogInStrategy from './LogInStrategy';

export interface IStrategiesContainer {
    SignUpStrategy : SignUpStrategy;
    LogInStrategy: LogInStrategy;
}

export default {
    SignUpStrategy: asClass(SignUpStrategy),
    LogInStrategy: asClass(LogInStrategy)
}