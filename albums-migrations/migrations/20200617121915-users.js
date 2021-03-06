const Faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  async up(db) {

    const passwords = ['user', 'admin', 'pinta'];
    const roles = ["USER", "ADMIN", "USER"];
    const email = '@gmail.com';
    const size = passwords.length;

    let items = [];

    for (let j = 0; j < size; j++) {
      let item = {};
      item.role = roles[j];
      item.email = `${passwords[j]}${email}`;
      item.firstName = Faker.name.firstName();
      item.lastName = Faker.name.lastName();
      item.password = await bcrypt.hash(passwords[j], 10);

      items.push(item);
    }

    return db.collection('users').insertMany(items);
  }
};