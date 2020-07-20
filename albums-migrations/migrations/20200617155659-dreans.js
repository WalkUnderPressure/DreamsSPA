const Faker = require('faker');
const mongoose = require('mongoose');

module.exports = {
  async up(db) {

    let items = [];
    let item = {};
    const itemsCount = 3;

    const users = await db.collection('users').find().toArray();

    if (users.length > 0) {
      users.forEach(user => {
        for (let j = 0; j < itemsCount; j++) {
          let longDescription = '';
          const descriptionLength = Faker.random.number({ min: 5, max: 25 });

          for (let index = 0; index < descriptionLength; index++) {
            longDescription += ' ' + Faker.random.words() + ' ';
          }

          item = {
            owner: user._id,
            codeName: Faker.random.words(),
            description: longDescription,
            dateOfEvent: Faker.date.future().getTime(),
            guests: [],
            needThings: [],
            publicAccess: j < itemsCount / 2 ? 'PUBLIC' : 'PRIVATE',
          };

          let guestsSize = Faker.random.number({ min: 3, max: 5 });
          let needThingsSize = Faker.random.number({ min: 1, max: 6 });

          for (let i = 0; i < guestsSize; i++) {
            item.guests.push(Faker.random.word());
          }

          for (let i = 0; i < needThingsSize; i++) {
            item.needThings.push(Faker.random.word());
          }

          items.push(item);
        }
      });
    }

    return db.collection('dreans').insertMany(items);
  }
};