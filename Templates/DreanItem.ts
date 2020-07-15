import { PublicAccess } from '../server/models/Drean.model';
export default interface DreanItem {
    _id? : string;
    codeName : string;
    description : string;
    dateOfEvent : number;
    guests : [string];
    needThings : [string];
    publicAccess: PublicAccess;
}
