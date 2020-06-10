import { Document, Schema, Model, model } from 'mongoose'
import DreanModel, { Drean } from './dreans.model'

export class DreansRepository {
  getDrean (id: string) {
    return DreanModel.find({ _id: id })
  }

  getDreans () {
    return DreanModel.find({})
  }

  addDrean (drean: Drean) {
    return DreanModel.insertMany(drean as Drean)
  }

  deleteDrean (id: string) {
    return DreanModel.findOneAndRemove({ _id: id })
  }

  updateDrean (id: string, drean: Drean) {
    return DreanModel.findByIdAndUpdate(id, drean as Drean)
  }
}

// const repo: DreansRepository = new DreansRepository();
// import { MONGO_URL, DB_NAME } from '../COMMON';

// db_connection()
// .then(info => {
//     console.log(`Connected to ${MONGO_URL}${DB_NAME}`);

//     repo.getDreans()
//         .then(res =>{
//             console.log('all dreans : ',res);
//         })

// }).catch((err) => {
//     console.error('Unable to connect to database!');
//     console.log("Error : ",err);
//     process.exit(1);
// })

// repo.addDrean({
//     codeName : "Excalibur",
//     description : "Wizard!",
//         dateOfEvent : new Date,
//         guests : ["Saruman","Gendalf"],
//         needThings : ["Ice","Fire"]
// } as Drean)
//     .then(res=>{
//         console.log("add >>> ",res)
//     });

// repo.getDreans()
//     .then(res =>{
//         console.log("get dreans >>> ",res);
//     });

const id: string = '5ee0caad36ec1e3f1c7fbb1f'
// repo.getDrean(id)
//     .then(res =>{
//         console.log(`get drean by id ${id} >>> : ${res}`);
//     });

// repo.deleteDrean(id)
//     .then(res =>{
//         console.log("delete >>> ",res);
//     });

// repo.updateDrean(id,{
//     codeName : "WIZ",
//     description : "Chalifa!",
//         dateOfEvent : new Date,
//         guests : ["Back","Yellow"],
//         needThings : ["Ice Cube","Dr. Dre"]
// } as Drean)
//     .then(res=>{
//         console.log("update >>> ",res)
//     });
