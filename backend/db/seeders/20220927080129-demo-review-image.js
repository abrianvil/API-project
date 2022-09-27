'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('ReviewImages', [
        {
          reviewId:1,
          url:'https://townsquare.media/site/442/files/2018/01/metropolis-tv-series-pic.jpg'
        },
        {
          reviewId:2,
          url:'https://static.wikia.nocookie.net/batman/images/3/32/BatmanArkhamKnightGothamCity.jpg/revision/latest?cb=20140530010522'
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
