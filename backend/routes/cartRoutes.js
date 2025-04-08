const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// getting current user cart

router.get("/", protect, async (req, res) => {

    try {
        const cart = await Cart.findOne({ user:req.userId}).populate("items.product");
        res.json(cart || { items: []});
    } catch (err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
});



// ading and updating an item to the cart



router.post ("/add", protect, async (req, res) => {

    try{
        const { productId, quantity} = req.body;
        let cart = await Cart.findOne({ user: req.userId});

        if (!cart) { new Cart ({ user: req.userId, items: []});
        }

        const itemIndex = cart.items.findIndex((item) => item.product.toString()=== productId);

        if (itemIndex > -1){
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity});
        }
        
        await cart.save();
        res.json(cart);
        
    } catch (err){
        res.status(500).json({ message: "Server error", error: err.message});
    }
});

//removing an item

router.delete("/remove/:productId", protect, async (req, res) => {
    try{ 
        const cart = await Cart.findOne({ useer: req.userId});
        if (!cart) return res.status(404).json({ message: "Cart not found"});

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== req.params.productId
        );

        await cart.save();
        res.json(cart);
    } catch(err){
       res.status(500).json({ message: "Servor error", error: err.message}); 
    }
});

// clearing the cart completely

router.delete("/clear", protect, async (req, res) =>{
    try {
        await Cart.findOneAndDelete({ user: req.userId });
        res.json({ message: "Cart cleared"});

    } catch (err){
        res.status(500).json({ message: "server error", error: err.message });
    }
});

module.exports = router;