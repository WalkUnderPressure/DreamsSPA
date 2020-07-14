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
      let longDescription = '';
      const descriptionLength = Faker.random.number({ min: 5, max: 25});
      for (let index = 0; index < descriptionLength; index++) {
        longDescription += ' ' + Faker.random.words() + ' ';
      }

      item = {
        owner_id: user._id.toString(),
        codeName: Faker.random.words(),
        description: longDescription,
        dateOfEvent: Faker.date.future().getTime(),
        guests:[],
        needThings: [],
        publicAccess: j < itemsCount/2,
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