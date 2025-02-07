const User = require('../db/Model/userModel');
const userType = require('../db/Model/userType');


exports.vendors = async function (req, res) {
    try {
        const vendorType = await userType.findOne({ userType: 'Vendor' });
        if (!vendorType) {
            return res.status(404).json({ message: "Vendor user type not found" });
        }


        const vendors = await User.find({ userType: vendorType._id });


        if (vendors.length === 0) {
            return res.status(404).json({ message: "No vendors found" });
        }

        return res.status(200).json({ message: "Vendors retrieved successfully", vendors });

    } catch (error) {
        console.error("Error fetching vendors:", error);
        return res.status(500).json({ message: "An error occurred while fetching vendors" });
    }
};

exports.staff = async function(req,res){
    try {
        const staffType = await userType.findOne({userType : "Staff"});
        if(!staffType){
            return res.status(400).json({message : "userType not found"});
        };

        const staff = await User.find({ userType : staffType._id});
        if(staff.length === 0){
            return res.status(404).json({message : "no staff found"})
        }

        return res.status(200).json({message : "staff retrieved succesfully",staff})
    } catch (error) {
        console.error("Error fetching staff:", error);
        return res.status(500).json({ message: "An error occurred while fetching staff" });
    }
}

exports.users = async function(req,res){
    try {
        const userData = await userType.findOne({userType : "User"});
        if(!userData){
            return res.status(400).json({message : "userType not found"})
        }

        const user = await User.find({userType : userData._id});
        if(user.length === 0){
            return res.status(404).json({message : "no user found"});
        }
        return res.status(200).json({message : "user retrieved succesfully"})
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "An error occurred while fetching user" });
    }
}
