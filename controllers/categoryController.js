const Category = require ('../models/Category');
const Products = require('../models/Product');



const categoryController = {

    getCategories : async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
            } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    addCategory : async (req,res) =>{
        try {
            const {name} =  req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg:"category exist already ;) "})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg:"category created !!!"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    deleteCategory : async (req,res)  =>{
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({msg: "You should Delete all products related to this category firstly."})

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Category Deleted !!"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    updateCategory: async (req,res) =>{
        try {
            const {name} = req.body
            await Category.findOneAndUpdate({_id: req.params.id},{name})
            res.json({msg:"category updated"})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    }
    
} 

module.exports = categoryController;