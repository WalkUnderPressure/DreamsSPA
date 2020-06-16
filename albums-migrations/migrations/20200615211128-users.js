const Faker = require('faker');
const {USER_ROLE} = require('../../COMMON');
const bcrypt = require('bcrypt');

module.exports = {
  up(db) {
    let user_profile = {};
    user_profile.role = USER_ROLE.USER;
    user_profile.email = 'user@gmail.com';

    bcrypt.hash('user', 10, (hashError, encrypted) => {
      if (!hashError) {
        admin_profile.password = encrypted;
      }
    });
    
    let admin_profile = {};
    admin_profile.role = USER_ROLE.ADMIN;
    admin_profile.email = 'admin@gmail.com';
    
    bcrypt.hash('admin', 10, (hashError, encrypted) => {
      if (!hashError) {
        admin_profile.password = encrypted;
      }
    });

    let items = [];
    items.push(user_profile);
    items.push(admin_profile);
  
    for(let j=0; j < items.length; j++){
      items[j].firstName = Faker.name.firstName();
      items[j].lastName = Faker.name.lastName();
    }

    return db.collection('users').insertMany(items);
  }
};