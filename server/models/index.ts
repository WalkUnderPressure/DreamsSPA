import { asValue } from 'awilix';
import DreanModel, { DreanType } from './Drean.model';

export interface IModelContainer {
    DreanModel: DreanType;
}

export default {
    DreanModel: asValue(DreanModel)
}