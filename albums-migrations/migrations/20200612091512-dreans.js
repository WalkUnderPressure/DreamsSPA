const Faker = require('faker');

module.exports = {
  up(db) {

    let items = [];
    let item = {};
    const itemsCount = 12;

    for(let j=0; j < itemsCount; j++){
      item = {
        codeName: Faker.random.words(),
        description: Faker.random.words(),
        dateOfEvent: Faker.date.future(),
        guests:[],
        needThings: []
      };

      let guestsSize = Faker.random.number({ min: 3, max: 5});
      let needThingsSize = Faker.random.number({ min: 1, max: 6});

      for(let i =0; i < guestsSize; i++){
        item.guests.push(Faker.random.word());
      }

      for(let i =0; i < needThingsSize; i++){
        item.needThings.push(Faker.random.word());
      }

      items.push(item);
    }
    
    return db.collection('dreans').insertMany(items);
  },
 
  down(db) {
    return db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};