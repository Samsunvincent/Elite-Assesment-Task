const Users = require("../db/Model/userModel");
const UserType = require("../db/Model/userType");
const bcrypt = require("bcrypt");
const Category = require('../db/Model/categoryModel');
const Product = require('../db/Model/productModel')

exports.createUser = async function (req, res) {
    try {
        let { name, email, password, phone, address } = req.body;

        // Validation for required fields
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the email already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Determine user type based on API route
        let userTypeName = "User"; // Default user type
        if (req.path.includes("Vendor")) {
            userTypeName = "Vendor";
        } else if (req.path.includes("Staff")) {
            userTypeName = "Staff";
        }

        // Find the user type from the UserType collection
        const userType = await UserType.findOne({ userType: userTypeName });

        if (!userType) {
            return res.status(500).json({ message: `User type '${userTypeName}' not found` });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new Users({
            name,
            email,
            password: hashedPassword,
            userType: userType._id, 
            phone,
            address,
        });

        // Save to database
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.addProduct = async function (req, res) { 
    try {
        const { title, description, category, price, startDate } = req.body;

        
        const images = (req.files && req.files['images[]']) ? req.files['images[]'].map(file => ({
            url: file.path,
            alt: req.body.altText || 'Product Image',
        })) : [];

        if (!title || !description || !category || !price || !startDate || images.length === 0) {
            return res.status(400).json({ message: "All fields are required, including images" });
        }

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ message: "Price must be a valid positive number" });
        }

        const start = new Date(startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (isNaN(start.getTime())) {
            return res.status(400).json({ message: "Invalid start date format" });
        }

        if (start < today) {
            return res.status(400).json({ message: "Start date cannot be in the past" });
        }

        const expiry = new Date(start);
        expiry.setDate(expiry.getDate() + 7);

        // Find the matching category by ID
        const matchCategory = await Category.findOne({category : category});  

        if (!matchCategory) {
            return res.status(400).json({ message: "Select a valid category" });
        }

       

        const vendor = req.user.id;
        console.log("vendor",vendor);

        const newProduct = new Product({
            title,
            description,
            category: matchCategory._id, 
            price,
            scheduledStartDate: start, 
            expiryDate: expiry, 
            images,
            vendor,  
        });

        
        await newProduct.save();

        res.status(201).json({ message: "Product added successfully", product: newProduct });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
