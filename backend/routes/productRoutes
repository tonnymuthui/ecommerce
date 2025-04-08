import { Admin } from "mongodb";

const express = require("express");
const Product = require("../models/product");
const protect = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");


const router = express.Router();

/**
 * @route   POST /api/products
 * @desc   Create a new product (Admin only)
 * @access Private (Admin) 
 */

router.post("/", protect, checkRole(["admin"]), async (req,res) =>{
    try{
        const {name, description, price, category, stock } = req.body; // removed ", image" from here FMI incase of error

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            image: req.file ? `/uploads/${req.file.filename}` : null,
            createdBy: req.userId,
        });

        await newProduct.save();
        res.status(201).json(newProduct);

    }catch(error){
        res.status(500).json({message: "Server errror", error: error.mssage});
    }
});


/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */

router.get("/", async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    } catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 * @access  Public
 */

router.get("/:id", async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found"});
        res.json(product);
    } catch(error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product (Admin Only)
 * @access  Private (Admin)
 */

router.put("/:id", protect, checkRole(["admin"]), async (req, res) => {
    try {
        const {name, description, price, category, stock, image } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({message: "Product not found"});

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.catwgory;
        product.stock = stock || product.stock;
        product.image = image || product.image;
        

        await product.save();
        res.json(product);
        
    } catch (error){
        res.status(500).json({ message: "Server error", error: error.message});
    }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product (Admin Only)
 * @access  Private (Admin)
 */

router.delete("/:id", protect, checkRole(["admin"]), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404),json({ message: "Product not Found"});

        await product.deleteOne();
        res.json({ message: "Product deleted"});

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = router;