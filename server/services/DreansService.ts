import BaseContext from '../BaseContext';
import { DreanType } from '../models/Drean.model';

export default class DreansService extends BaseContext{
    
    getAllDreansWithOwner(owner_id: string){
        console.log('owner id ', owner_id);
        const { DreanModel } = this.di;
        return DreanModel.find({owner_id: owner_id})
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
    
    updateDreanByID (id: string, drean: DreanType ) {
        const { DreanModel } = this.di;
        return DreanModel.findByIdAndUpdate(id, drean)
    }
    
    createDrean(drean: DreanType) {
        const { DreanModel } = this.di;
        return DreanModel.insertMany(drean);
    }
}