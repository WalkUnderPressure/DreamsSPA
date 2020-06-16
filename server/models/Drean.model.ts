import mongoose from 'mongoose';
import { prop, modelOptions, getModelForClass, DocumentType} from '@typegoose/typegoose';
import DreanItem from '../../Templates/DreanItem'

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
    owner_id: string;

    @prop()
    codeName: string;

    @prop()
    description: string;

    @prop()
    dateOfEvent: Date;

    @prop({type: String })
    guests: [string]

    @prop({type: String })
    needThings: [string]
}

export type DreanType = mongoose.Model<DocumentType<DreanSchema>, {}> & DreanSchema;
export default getModelForClass(DreanSchema);