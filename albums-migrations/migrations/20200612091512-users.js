const Faker = require('faker');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.export = {
  up(db) {
    let user_profile = {};
    user_profile.role = "USER";
    user_profile.email = 'user@gmail.com';


    bcrypt.hash('user', 10, (hashError, encrypted) => {
      if (!hashError) {
        admin_profile.password = encrypted;
      }
    });

    let admin_profile = {};
    admin_profile.role = "ADMIN";
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

    return db.collection('users').insertMany(items)
        .then(res => {
          for (let j=0; j<items.length; j++){
            db.collection('users').findOne({ email:  items[j].email })
                .then(res => {
                  const payload = {
                    sub: res._id
                  };
                  const token = jwt.sign(payload, config.jwtSecret);
                  res.token = token;
                  res.save();
                })
          }
        })
  }
};