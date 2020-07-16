import mongoose, { Schema } from 'mongoose';
import { prop, modelOptions, getModelForClass, DocumentType, pre, Ref} from '@typegoose/typegoose';
import DreanItem from '../../Templates/DreanItem'
import { UserSchema } from './User.model';

export enum PublicAccess {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
type ObjectId = mongoose.Types.ObjectId; 

@pre<DreanSchema>("save", function (next) {
  // console.log('drean pre save hook ', this);
  if (this._id === undefined || this._id === null) {
    this._id = mongoose.Types.ObjectId();
  }
  
  this.dateOfEvent = new Date(this.dateOfEvent).getTime();

  if (!this.publicAccess || !Object.values(PublicAccess).includes(this.publicAccess)) {
    console.log('PUBLIC ACCESS NOT EQUAL OF ENUM ITEMS', this.publicAccess);
    this.publicAccess = PublicAccess.PRIVATE;
  }

  return next();
})

@modelOptions({schemaOptions: {collection: 'dreans', versionKey: false }})
export class DreanSchema implements DreanItem{
    @prop({ type: Schema.Types.ObjectId, ref: 'UserSchema'})
    owner: Ref<UserSchema>;

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

    @prop({enum: PublicAccess})
    publicAccess: PublicAccess;
}

// export type DreanType = mongoose.Model<DocumentType<DreanSchema>, {}> & DreanSchema;
export type DreanType = mongoose.Model<DocumentType<DreanSchema>, {}> & DreanSchema;
export default getModelForClass(DreanSchema);