const mongoose =require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String, //ill store url and add image upload later
           
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            
        },
        price: {
            type: Number,
            required: true,
        },

    },
    { timestamps: true}
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;