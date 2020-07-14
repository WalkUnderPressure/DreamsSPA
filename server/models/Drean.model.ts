import mongoose from 'mongoose';
import { prop, modelOptions, getModelForClass, DocumentType, pre} from '@typegoose/typegoose';
import DreanItem from '../../Templates/DreanItem'

@pre<DreanSchema>('update', function(next) {
  console.log('this ', this);
    next();
})

@modelOptions({schemaOptions: {collection: 'dreans', versionKey: false }})
export class DreanSchema implements DreanItem{

    @prop()
    owner_id: string;

    @prop()
    codeName: string;

    @prop()
    description: string;

    @prop()
    dateOfEvent: number;

    @prop({type: String })
    guests: [string];

    @prop({type: String })
    needThings: [string];

    @prop()
    publicAccess: boolean;
}

export type DreanType = mongoose.Model<DocumentType<DreanSchema>, {}> & DreanSchema;
export default getModelForClass(DreanSchema);