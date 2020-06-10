import * as mongoose from 'mongoose'
import { prop, Typegoose } from 'typegoose'

export class Drean extends Typegoose {
    @prop()
    codeName: string;

    @prop()
    description: string;

    @prop()
    dateOfEvent: Date;

    @prop()
    guests: Array<string>;

    @prop()
    needThings: Array<string>;
}

const DreanModel = new Drean().getModelForClass(Drean, {
  existingMongoose: mongoose,
  schemaOptions: { collection: 'dreans', versionKey: false }
})

export default DreanModel