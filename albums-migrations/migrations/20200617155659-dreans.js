const Faker = require('faker');
const mongoose = require('mongoose');

module.exports = {
  async up(db) {

    let items = [];
    let item = {};
    const itemsCount = 6;
    
    const user = await db.collection('users').findOne({role: 'USER'});
    // const ownerId = user._id;

    for(let j=0; j < itemsCount; j++){
      item = {
        owner_id: user._id.toString(),
        codeName: Faker.random.words(),
        description: Faker.random.words(),
        dateOfEvent: Faker.date.future(),
        guests:[],
        needThings: []
      };

      let guestsSize = Faker.random.number({ min: 3, max: 5});
      let needThingsSize = Faker.random.number({ min: 1, max: 6});

      for(let i = 0; i < guestsSize; i++){
        item.guests.push(Faker.random.word());
      }

      for(let i = 0; i < needThingsSize; i++){
        item.needThings.push(Faker.random.word());
      }

      items.push(item);
    }

    return db.collection('dreans').insertMany(items);
  }
};