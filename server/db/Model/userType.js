const mongoose = require('mongoose');

let userTypeSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,  
      unique: true      
    }
  },
  { timestamps: true }  
);

module.exports = mongoose.model('userType', userTypeSchema);
