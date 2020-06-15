import BaseContext from '../BaseContext';
import { DreanType } from '../models/Drean.model';

export default class DreansService extends BaseContext{
    
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