const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [orderItemSchema],
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "COD",
        },
        paymentMethod: {
            type: String,
            enum: ["COD", "VISA", "MPESA"],
            default: "COD",
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        paymentDetails: {
            type: Object,
        },

    },
    {timestamps: true}
);


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;