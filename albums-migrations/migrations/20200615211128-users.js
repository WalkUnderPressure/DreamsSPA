const Faker = require('faker');

module.exports = {
  up(db) {
    let items = [];
    let item = {};
    const itemsCount = 2;

    for(let j=0; j < itemsCount; j++){
      item = {
        login: 'testUser',
        description: 'password'
      };
      items.push(item);
    }

    return db.collection('users').insertMany(items);
  }
};