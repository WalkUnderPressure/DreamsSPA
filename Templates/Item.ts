export default interface Item {
    id : string;
    codeName : string;
    description : string;
    dateOfEvent : Date;
    guests : Array<string>;
    needThings : Array<string>;
}