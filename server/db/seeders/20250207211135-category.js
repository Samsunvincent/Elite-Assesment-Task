const Category = require('../Model/categoryModel');
const mongoose = require('mongoose');
const { down } = require('./20250207061821-usertype');


'use strict';

module.exports = {
  up: async () => {
    try {
      const result = await Category.insertMany([
        {
          _id: new mongoose.Types.ObjectId("67a67981e6093b6138c1df62"),
          category: "Electronics"
        },
        {
          _id: new mongoose.Types.ObjectId("67a6798ce6093b6138c1df63"),
          category: "Home & Kitchen"
        },
        {
          _id: new mongoose.Types.ObjectId("67a6799be6093b6138c1df64"),
          category: "Beauty & Personal Care"
        },
        {
          _id: new mongoose.Types.ObjectId("67a679a3e6093b6138c1df65"),
          category: "Sports & Outdoors"
        },
        {
          _id: new mongoose.Types.ObjectId("67a679b2e6093b6138c1df66"),
          category: "Automotive"
        }
      ])
      console.log("Seeding successful");
      console.log(result.length);
    } catch (error) {
      console.error("Seeding failed:", error);

    }

  },
  down: async () => {
    try {
      const result = await Category.deleteMany({
        _id: {
          $in: [
            new mongoose.Types.ObjectId("67a67981e6093b6138c1df62"),
            new mongoose.Types.ObjectId("67a6798ce6093b6138c1df63"),
            new mongoose.Types.ObjectId("67a6799be6093b6138c1df64"),
            new mongoose.Types.ObjectId("67a679a3e6093b6138c1df65"),
            new mongoose.Types.ObjectId("67a679b2e6093b6138c1df66"),

          ]
        }
      })
      console.log("Seeder rollback successful");
      console.log(result.deletedCount);
    } catch (error) {
      console.error("Rollback failed:", error);

    }
  }
};
