const Faker = require('faker');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const config = require('../../config');
// const jwtSecret = config.jwtSecret; 
const jwtSecret = 'ub2aWS62u9LXbBV22CfG263zecqc2692npKdsKG98cpubxf2R6vFJhf3qUb2aj2z';

module.exports = {
  async up(db) {

    const passwords = ['user', 'admin'];
    const roles = ["USER", "ADMIN"];
    const email = '@gmail.com';
    const size = passwords.length;

    let items = [];

    for (let j = 0; j < size; j++) {
      let item = {};
      item.role = roles[j];
      item.email = `${roles[j]}${email}`;
      item.firstName = Faker.name.firstName();
      item.lastName = Faker.name.lastName();

      // item._id = Faker.random.uuid();
      // const payload = { sub: item._id };
      // item.token = jwt.sign(payload, jwtSecret);
      
      item.password = await bcrypt.hash(passwords[j], 10);

      items.push(item);
    }

    return db.collection('users').insertMany(items);
  }
};