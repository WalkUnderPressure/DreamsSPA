import { PublicAccess } from '../server/models/Drean.model';
import { Ref } from '@typegoose/typegoose';
export default interface DreanItem {
    _id? : string;
    codeName : string;
    description : string;
    dateOfEvent : number;
    guests : [string];
    needThings : [string];
    publicAccess: PublicAccess;
    owner: Ref<any>;
}
