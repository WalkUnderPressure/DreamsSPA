import * as awilix from 'awilix';
import coreConfig from '../config';
import modelContainer, { IModelContainer } from './models';

export interface IContextContainer extends IModelContainer  {
    config: any;
}

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    config: awilix.asValue(coreConfig),
    ...modelContainer,
});

export default container;

