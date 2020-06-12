import {DreanType, DreanSchema} from '../models/Drean.model';
import DreanModel from '../models/Drean.model';

export default class DreansQueries {
  static getDrean (id: string) {
    return DreanModel.findById(id);
  }

  static getDreans () {
    return DreanModel.find({});
  }

  static addDrean (drean: DreanType) {
    return DreanModel.insertMany(drean as DreanType)
  }

  static deleteDrean (id: string) {
    return DreanModel.findByIdAndRemove(id);
  }

  static updateDrean (id: string, drean) {
    return DreanModel.findByIdAndUpdate(id, drean)
  }

  static createDrean(data) {
    return DreanModel.insertMany(data);
  }
}

// test 
// import models from '../db/database'
// import config from '../config'
// import DreanItem from '../Templates/DreanItem';
// models(config.mongo.uri, config.mongo.options)

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



// repo.deleteDrean(id)
//     .then(res =>{
//         console.log("delete >>> ",res);
//     });

// const id: string = '5ee32f68ff9b281e09630356'
// DreansQueries.getDrean(id)
//   .then(res => {
//     console.log(`get drean by id ${id} >>> : ${res}`)
//   })


// DreansQueries.createDrean({
//   codeName : "Moana",
//   description : "WaterFall!",
//   dateOfEvent : new Date,
//   guests: ['ocean','river'],
//   needThings: ['mountain','volcano']
// })
//   .then(res=>{
//     console.log("update >>> ",res)
//   });
