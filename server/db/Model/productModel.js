const mongoose = require('mongoose');
const slugify = require('slugify'); 

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true 
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    scheduledStartDate: {
        type: Date,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    images: [
        {
            url: { type: String, required: true },
            alt: { type: String }
        }
    ],
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
   
    newPrice : {
        type : Number,
        required : true
    },
    freeDelivery: {
        type: String,
        enum: ['Yes', 'No'],
        required : true
    }
    
}, { timestamps: true });

productSchema.pre('save', async function (next) {
    if (!this.isModified('title')) return next();

    let slug = slugify(this.title, { lower: true });
    let existingProduct = await mongoose.model('Product').findOne({ slug });


    if (existingProduct) {
        slug = `${slug}-${Date.now()}`;
    }

    this.slug = slug;
    next();
});

module.exports = mongoose.model('Product', productSchema);
