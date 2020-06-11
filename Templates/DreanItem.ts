export default interface DreanItem {
    _id? : string;
    codeName : string;
    description : string;
    dateOfEvent : Date;
    guests : Array<string>;
    needThings : Array<string>;
}
