const userType = require('../Model/userType'); 
const mongoose = require('mongoose');

'use strict';

module.exports = {
  up: async () => {
    try {
      // Explicitly cast _id to ObjectId
      const result = await userType.insertMany([
        {
          _id: new mongoose.Types.ObjectId("67a5a628db029eff69c5d729"),
          userType: "Staff"
        },
        {
          _id: new mongoose.Types.ObjectId("67a5a638db029eff69c5d72a"),
          userType: "Vendor"
        },
        {
          _id: new mongoose.Types.ObjectId("67a5a647db029eff69c5d72b"),
          userType: "User"
        }
      ]);
      console.log("Seeding successful");
      console.log(result.length);
    } catch (error) {
      console.error("Seeding failed:", error);
    }
  },

  down: async () => {
    try {
      // Deleting based on the fixed _id values
      const result = await userType.deleteMany({
        _id: {
          $in: [
            new mongoose.Types.ObjectId("67a5a628db029eff69c5d729"), 
            new mongoose.Types.ObjectId("67a5a638db029eff69c5d72a"),
            new mongoose.Types.ObjectId("67a5a647db029eff69c5d72b"),

          ]
        }
      });
      console.log("Seeder rollback successful");
      console.log(result.deletedCount); 
    } catch (error) {
      console.error("Rollback failed:", error);
    }
  }
};
