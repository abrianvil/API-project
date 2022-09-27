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
   await queryInterface.bulkInsert('Bookings', [
    {
      spotId:1,
      userId:5,
      startDate:new Date('February 10, 2023'),
      endDate:new Date('February 31, 2023')
    },
    {
      spotId:4,
      userId:4,
      startDate:new Date('December 10, 2022'),
      endDate:new Date('December 25, 2022')
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Bookings', null, {});

  }
};
