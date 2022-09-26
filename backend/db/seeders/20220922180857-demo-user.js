'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo_firstName',
        lastName: 'Demo_lastName',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'FakeUser_firstName',
        lastName: 'FakeUser_lastName',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'FakeUser2_firstName',
        lastName: 'FakeUser2_lastName',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'abel@user.io',
        username: 'AbelUser',
        firstName: 'Abel_firstName',
        lastName: 'Brianvil',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'Urbens@user.io',
        username: 'UrbensUser',
        firstName: 'Urbens_firstName',
        lastName: 'Belinho',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
