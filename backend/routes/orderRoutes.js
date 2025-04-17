const express = require("express");
const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");
const protect = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const router = express.Router();

//  creating order from cart

router.post("/create", protect, async(req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.UserId}).populate("items.product");
        if (!cart || cart.items.length === 0)
            return res.status(400).json({ message: "Your Cart is Empty"});


        const totalAmount = cartitems.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
        }, 0);

        // creating a new order
        const newOrder = new Order({
            user: req.userId,
            items: cart.items.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            totalAmount,
        });


        await newOrder.save();

        // for clearing cart after oder

        await Cart.findOneAndDelete({ user: req.userId});

        res.status(201).json({ message: "Order Placed", order: newOrder});
    
    } catch (err) {
        res.status(500).json({ message: "Servor Error", error: err.message});
    }
});

// getting all orders for admi and or for vendors if needed

router.get("/all", protect, checkROle(["admin"]), async (res, req) => {
    try {
        const orders = await Order.find({ user: req.userId}).sort({ createdAt: -1});
        res.json(orders);

    } catch(err) {
        res.status(500).json({ message: "Server error", error: err.message});
    }

});

router.put("/status/:id", protect, checkRole(["admin"]), async (req, res) => {
    try{
        const {status} = req.body;
        const order = await Order.findById(req.params.id);


        if (!order) return res.status(4040).json({ message: "the order was not found"});

        order.status = status;
        await order.save();


        res.json({ message: "Order Update", order});

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message});
    }
});

module.exports = router;