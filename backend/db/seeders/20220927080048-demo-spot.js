'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '233 yourLost st',
        city: 'cityBoys',
        state: 'Michigan',
        country: 'United State',
        lat: 80,
        lng: 100,
        name: 'The Crib',
        description: "A dope place to stay, if you're a dirty person don't come, oh and it is blue",
        price: 4999.99
      },
      {
        ownerId: 2,
        address: '111 headless Chicken rd',
        city: 'miami',
        state: 'Florida',
        country: 'United State',
        lat: 40,
        lng: 60,
        name: 'The Heat',
        description: "it's just to hot, don't come, oh and it is yellow",
        price: 9999.99
      },
      {
        ownerId: 3,
        address: '100 clueless ave',
        city: 'idk city',
        state: 'Montana',
        country: 'United State',
        lat: 90,
        lng: 140,
        name: 'The woods',
        description: "nothing but trees, oh and it is green",
        price: 3999.99
      },
      {
        ownerId: 4,
        address: '100 super st',
        city: 'metropolis',
        state: 'Virginia',
        country: 'United State',
        lat: 30,
        lng: 160,
        name: 'The nook',
        description: "nothing but trees, oh and it is red",
        price: 5999.99
      },
      {
        ownerId: 5,
        address: '666 joker rd',
        city: 'gotham city',
        state: 'New York',
        country: 'United State',
        lat: 75,
        lng: 180,
        name: 'The end',
        description: "you're done for, it is a wrap , oh and it is pitch black",
        price: 1.99
      }

    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('spots', null, {});

  }
};
