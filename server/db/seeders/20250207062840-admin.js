const bcrypt = require('bcrypt');
const userdata = require('../Model/userModel');  

'use strict';

module.exports = {
  up: async (models, mongoose) => {
    try {
      
      const existingAdmin = await userdata.findOne({ email: "admin@gmail.com" });

      if (existingAdmin) {
        console.log("Admin already exists!");
        return;
      }

      const hashedPassword = await bcrypt.hash("admin#123", 10);

      const result = await userdata.insertMany([
        {
          _id: "67a5a894d8ce807b45d0b2f8",
          name: "Admin",
          email: "admin@gmail.com",
          password: hashedPassword, 
          role: "Admin",  
          isActive: true,
          phone : 9898547787
        }
      ]);

      console.log(`${result.length} Admin user inserted`);  
    } catch (error) {
      console.error("Error inserting Admin user:", error);
    }
  },

  down: async (models, mongoose) => {
    try {
      const result = await userdata.deleteMany({
        _id: { $in: ["67a5a894d8ce807b45d0b2f8"] }
      });

      console.log(`${result.deletedCount} Admin user deleted`);
    } catch (error) {
      console.error("Error deleting Admin user:", error);
    }
  }
};
