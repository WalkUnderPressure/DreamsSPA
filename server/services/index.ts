import { asClass } from 'awilix';
import DreansService from './DreansService';

export interface IServicesContainer {
    DreansService : DreansService;
}

export default {
    DreansService: asClass(DreansService)
}