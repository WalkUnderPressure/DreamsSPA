import BaseContext from '../BaseContext';
import { DreanType, PublicAccess, DreanSchema } from '../models/Drean.model';
import { Schema } from 'mongoose';

export default class DreansService extends BaseContext{
    
    getAllDreansWithOwner(ownerId: string){
        const { DreanModel } = this.di;
        return DreanModel.find({ owner: ownerId });
    }

    getAllDreansByAccess(publicAccess: PublicAccess){
        const { DreanModel } = this.di;
        return DreanModel.find({ publicAccess })
    }

    async getAllPublicDreansWithOwner(){
        const dreans = await this.getAllDreansByAccess(PublicAccess.PUBLIC);
        
        return new Promise(async (resolve, reject) => {
            const dreansArray = [];
            for(let i=0; i< dreans.length; i++){
                await dreans[i].populate({ path: 'owner', select: ['_id', 'role', 'email', 'firstName', 'lastName'] }).execPopulate()
                dreansArray.push(dreans[i]);
            }
            if(dreansArray.length === dreans.length){
                resolve(dreansArray);
            }else{
                reject('Cant get dreans!');
            }
        })
    }

    getAllDreans () {
        const { DreanModel } = this.di;
        return DreanModel.find({});
    }
    
    getDreanByID (id: string) {
        const { DreanModel } = this.di;
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
        return DreanModel.findByIdAndUpdate(id, drean);
    }
    
    async createDrean(ownerId: string, drean: DreanType) {
        const { DreanModel, UserModel } = this.di;
        const owner = await UserModel.findById(ownerId);
        drean.owner = owner._id;
        const newDrean = new DreanModel(drean);
        return newDrean.save();
    }

    deleteDreansWithRemovingUser(ownerId: string){
        const { DreanModel } = this.di;
        return DreanModel.deleteMany({ owner: ownerId, publicAccess: {$nin : [PublicAccess.PUBLIC] } })
    }
}