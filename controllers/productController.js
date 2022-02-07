const Products = require("../models/Product");


// filter, sorting and paginating
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy)
    }
    else{
      this.query = this.query.sort('-createdAt')
    }
    return this;
  }

  filtering() {
    const queryObj = { ...this.queryString }; 
    //queryString = req.query

    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete(queryObj[el]));

    // console.log({after: queryObj})

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,(match) => "$" + match);

    // console.log({queryStr})

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 10
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit)
    return this;
  }
}

const productController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering().sorting().paginating();

      const products = await features.query;

      res.json({
        status: 'success',
        result: products.length,
        products: products
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  addProduct: async (req, res) => {
    try {
      const {
        productId,
        title,
        price,
        sold,
        description,
        category,
        images,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "no image uploaded" });

      const product = await Products.findOne({ productId });
      if (product)
        return res.status(400).json({ msg: "product name exist already" });

      const newProduct = new Products({
        productId,
        title: title.toLowerCase(),
        price,
        sold,
        description,
        category,
        images,
      });

      await newProduct.save();

      res.json({ msg: "new product added" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "product deleted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, sold, description, category, images } = req.body;
      if (!images)
        return res.status(400).json({ msg: "you should upload an image :)" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          sold,
          description,
          category,
          images,
        }
      );
      res.json({ msg: "product updated" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productController;
