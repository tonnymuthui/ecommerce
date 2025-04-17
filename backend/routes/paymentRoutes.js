const express = require("express");
// const stripe = require( "stripe")(process.env.STRIPE_SECRET_KEY);
const protect = require("../middleware/authMiddleware");
const Cart = require("../models/cart");
const Order = require("../models/order");


const router = express.Router();

// a checkout sesion 4 stripe
router.post("/stripe/checkout", protect, async( req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId }).populate("items.product");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: " cart is Empty"});
            
        }

        const line_items = cart.items.map(item => ({
            price_data: {
                currency: "kes",
                product_data: {
                    name: item.product.name,
                },
                unit_amount: item.product.price * 100, // in  centts

            },
            quantity: item.quantity,
        }));


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: "http://localhost:3000/payment-success",
            cancel_url: "http://localhost:3000/payment-cancelled",
            metadata: {
                userId: req.userId,
            },
        });

        res.json({ url: session.url});
    } catch(err) {
        res.status(500).json({ error: err.message});
    }

}  
);
