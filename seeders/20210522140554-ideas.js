'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ideas', [
      {
        image: 'https://pilbox.themuse.com/image.jpg?url=https%3A%2F%2Fassets.themuse.com%2Fuploaded%2Fattachments%2F13240.jpg%3Fv%3Dfc25c5c63f9affc57a40c69dfc128dcfd6b8d9d710f8b8df896a9738d6d2274a&prog=1&w=780',
        title: 'Quote',
        description: 'Daily Inspiration!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://ca.hellomagazine.com/imagenes//homes/20210415111115/quick-gardening-tips/0-536-462/gardeing-tips-t.jpg',
        title: 'Tips for Gardening',
        description: 'Forget being a brown thumb! Fix that with these tips.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://i.ytimg.com/vi/PCjefkkmUvY/maxresdefault.jpg',
        title: 'DIY Home Decor',
        description: 'Home decor on a budget!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/04/woman-cooking-healthy-food-in-kitchen.jpg?fit=1200%2C879&ssl=1',
        title: 'Cooking at Home',
        description: 'Master cooking at home!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://stayglam.com/wp-content/uploads/2015/03/25-Stylish-Casual-Outfits-for-Spring-2015-660x400.jpg',
        title: 'Everyday fashion trends',
        description: 'Make fashion comfortable and fit into your liftstyle!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://www.houselogic.com/wp-content/uploads/2016/02/diy-home-remodeling-grout-bathroom_e1034d252496a3c615fd273d8cb8331c.jpg',
        title: 'DIY Home Reno',
        description: 'Let us help you do those renovations on your own.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://pilbox.themuse.com/image.jpg?url=https%3A%2F%2Fassets.themuse.com%2Fuploaded%2Fattachments%2F13240.jpg%3Fv%3Dfc25c5c63f9affc57a40c69dfc128dcfd6b8d9d710f8b8df896a9738d6d2274a&prog=1&w=780',
        title: 'Quote',
        description: 'Daily Inspiration!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://ca.hellomagazine.com/imagenes//homes/20210415111115/quick-gardening-tips/0-536-462/gardeing-tips-t.jpg',
        title: 'Tips for Gardening',
        description: 'Forget being a brown thumb! Fix that with these tips.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://i.ytimg.com/vi/PCjefkkmUvY/maxresdefault.jpg',
        title: 'DIY Home Decor',
        description: 'Home decor on a budget!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/04/woman-cooking-healthy-food-in-kitchen.jpg?fit=1200%2C879&ssl=1',
        title: 'Cooking at Home',
        description: 'Master cooking at home!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
