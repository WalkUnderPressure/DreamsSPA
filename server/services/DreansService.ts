import BaseContext from '../BaseContext';
import { DreanType, PublicAccess, DreanSchema } from '../models/Drean.model';
import { Schema } from 'mongoose';

export default class DreansService extends BaseContext{
    
    getAllDreansWithOwner(owner_id: string){
        const { DreanModel } = this.di;
        return DreanModel.find({ owner_id: owner_id });
    }

    getAllPublicDreans(){
        const { DreanModel } = this.di;
        return DreanModel.find({ publicAccess: PublicAccess.PUBLIC })
    }

    getAllDreans () {
        const { DreanModel } = this.di;
        return DreanModel.find({});
    }
    
    async getDreanByID (id: string) {
        const { DreanModel } = this.di;

        const person = await DreanModel.findById(id);
        (await person.populate({ path: 'owner', select: ['_id', 'role', 'email', 'firstName', 'lastName'] }).execPopulate())
        person.populated('owner');
        console.log('Person -> ', person);


        const dreans = await DreanModel.find({ publicAccess: PublicAccess.PUBLIC });
        console.log('Dreans before - ', dreans);

        const newDreans = dreans.map(async (item) => {
            (await item.populate({ path: 'owner', select: ['_id', 'role', 'email', 'firstName', 'lastName'] }).execPopulate())
            
            item.populated('owner')
            console.log('return item ', item.owner);
            return item      
        })
                
        console.log('Dreans after - ', newDreans);

        return DreanModel.findById(id);
    }
    
    addDrean (drean: DreanType) {
        const { DreanModel } = this.di;
        return DreanModel.insertMany(drean)
    }
    
    deleteDreanByID (id: string) {
        const { DreanModel } = this.di;
        return DreanModel.findByIdAndRemove(id);
    }
    
    async updateDreanByID (id: string, drean: DreanType) {
        const { DreanModel } = this.di;
        console.log('drean for update  -> ', drean)
        return DreanModel.findByIdAndUpdate(id, drean);
    }
    
    async createDrean(ownerId: string, drean: DreanType) {
        const { DreanModel, UserModel } = this.di;
        const owner = await UserModel.findById(ownerId);

        drean.owner_id = ownerId;
        drean.owner = owner._id;
        const newDrean = new DreanModel(drean);
        return newDrean.save();
    }
}