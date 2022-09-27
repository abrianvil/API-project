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
<<<<<<< HEAD:backend/db/seeders/20220926210328-demo-spot-image.js
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/OYR75GV74MI6XHEQOMNP67M2BU.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://images.adsttc.com/media/images/623c/79f4/40c9/f001/65ef/d5bf/large_jpg/035-z-line-house-mssm-associates.jpg?1648130629',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr3QLz9Qn6VySVqZyVPCxtI0-mFtmapXZMuQ&usqp=CAU',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTenVOQ9M6IYr2sJir64rd09sb7n8w5SdXeuQ&usqp=CAU',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB4TNxjEHVMvINc-DrI5cQbIA0RniwlQyN6VeKCOUomqoeliRyn8BoKIexEP8pRUvq9Q8&usqp=CAU',
        preview: true
      }
    ], {});
=======
      await queryInterface.bulkInsert('SpotImages', [
        {
          spotId:1,
          url:'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/OYR75GV74MI6XHEQOMNP67M2BU.jpg',
          preview:true
        },
        {
          spotId:2,
          url:'https://images.adsttc.com/media/images/623c/79f4/40c9/f001/65ef/d5bf/large_jpg/035-z-line-house-mssm-associates.jpg?1648130629',
          preview:true
        },
        {
          spotId:3,
          url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr3QLz9Qn6VySVqZyVPCxtI0-mFtmapXZMuQ&usqp=CAU',
          preview:true
        },
        {
          spotId:4,
          url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTenVOQ9M6IYr2sJir64rd09sb7n8w5SdXeuQ&usqp=CAU',
          preview:true
        },
        {
          spotId:5,
          url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB4TNxjEHVMvINc-DrI5cQbIA0RniwlQyN6VeKCOUomqoeliRyn8BoKIexEP8pRUvq9Q8&usqp=CAU',
          preview:true
        }
      ], {});
>>>>>>> 8c53e66f5b6d155b4565af18d202c0797b2ebc08:backend/db/seeders/20220927080142-demo-spot-image.js
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', null, {});

  }
};
