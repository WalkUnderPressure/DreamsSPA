import DreanModel,{DreanType} from '../models/Drean.model';

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

  static updateDrean (id: string, drean: DreanType) {
    return DreanModel.findByIdAndUpdate(id, drean as DreanType)
  }

  static createDrean(drean) {
    return DreanModel.create(drean);
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

// repo.getDrean(id)
//   .then(res => {
//     console.log(`get drean by id ${id} >>> : ${res}`)
//   })

// repo.deleteDrean(id)
//     .then(res =>{
//         console.log("delete >>> ",res);
//     });

const id: string = '5ee2427c472d012d9b113ef7'

// DreansQueries.updateDrean(id,{
//   codeName : "WIZ",
//   description : "Chalifa!",
//   dateOfEvent : new Date,
//   guests : ["111","222"],
//   needThings : ["aa a","bb. b"]
// } as DreanType)
//     .then(res=>{
//       console.log("update >>> ",res)
//     });
