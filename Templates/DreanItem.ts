export default interface DreanItem {
    _id? : string;
    codeName : string;
    description : string;
    dateOfEvent : Date;
    guests : [string];
    needThings : [string];
}
