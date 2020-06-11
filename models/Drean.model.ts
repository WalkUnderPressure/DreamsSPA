import mongoose from 'mongoose';
import {pre, prop, modelOptions, getModelForClass, DocumentType} from '@typegoose/typegoose';
import DreanItem from '../Templates/DreanItem'

// @pre<DreanSchema>('save', function(next) {
//   this.updatedAt = new Date().getTime();
//   if (this.isNew) {
//     this.createdAt = new Date().getTime();
//   }
//   next();
// })

@modelOptions({schemaOptions: {collection: 'dreans', versionKey: false }})
export class DreanSchema implements DreanItem{
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

export type DreanType = mongoose.Model<DocumentType<DreanSchema>, {}> & DreanSchema;
export default getModelForClass(DreanSchema);