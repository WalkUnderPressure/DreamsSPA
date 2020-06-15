import * as awilix from 'awilix';
import coreConfig from '../config';
import modelContainer, { IModelContainer } from './models';
import servicesContainer, {IServicesContainer} from './services';

export interface IContextContainer extends IModelContainer,IServicesContainer  {
    config: any;
}

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    config: awilix.asValue(coreConfig),
    ...modelContainer,
    ...servicesContainer
});

export default container;

