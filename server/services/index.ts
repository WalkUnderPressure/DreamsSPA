import { asClass } from 'awilix';
import DreansService from './DreansService';
import UserService from './UserService';

export interface IServicesContainer {
    DreansService : DreansService;
    UserService: UserService;
}

export default {
    DreansService: asClass(DreansService),
    UserService: asClass(UserService)
}