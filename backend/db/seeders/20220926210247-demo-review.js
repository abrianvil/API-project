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
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 4,
        userId: 4,
        review: 'the best place on the entire planet',
        stars: 5
      },
      {
        spotId: 5,
        userId: 1,
        review: 'i was going to ask for a refund, but i am just happy i came out alive',
        stars: 0
      },
      {
        spotId: 2,
        userId: 2,
        review: 'stand in review from a famous reviewer',
        stars: 3
      },
      {
        spotId: 3,
        userId: 5,
        review: 'was it worth it? even after everything?',
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: 'never gonna let you down...',
        stars: 0
      },
    ], {})

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null, {});

  }
};
