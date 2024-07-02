const Product = require('../Models/ProductModel');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const { AWS_BUCKET_NAME } = process.env;

const s3 = new AWS.S3();

exports.addProduct = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    // const images = req.files.map(val => val.path)
    // if(images.length > 5) {
    //   res.status(413).json({ error: 'Too many images' })
    //   return
    // }
    const files = req.files;
    const imageUrls = [];

    // Upload all files to S3 and collect image URLs
    await Promise.all(
      files.map(async (file) => {
        const key = `${uuidv4()}-${file.originalname}`;
        const params = {
          Bucket: AWS_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        const data = await s3.upload(params).promise();
        imageUrls.push(data.Location);
      })
    );
    const product = await Product.create({ name, description, category, images:imageUrls });
    res.status(201).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const regex = new RegExp(query, 'i'); // Case-insensitive regex

    const products = await Product.find({
      $or: [{ name: regex }, { description: regex }],
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// exports.handleFileUpload = (req, res) => {
//   // Multer will process the uploaded files, and you can access them in req.files
//   const fileNames = req.files.map((file) => file.filename);
//   res.json({ fileNames });
// };

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: 'Data fetched successfully', success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProductsByCategories = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId || !Array.isArray(categoryId)) {
      return res.status(400).json({ error: 'Invalid request. Please provide an array of categories.' });
    }

    const products = await Product.find({ "category": { $in: categoryId } });

    res.status(200).json({ message: 'Data fetched successfully', success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    // Extract prodyct ID from request parameters or query parameters
    const {productId} = req.body;
    // Fetch products based on the filter
    const product = await Product.findById(productId);
    res.status(201).json({ message: "Data fetched successfully", success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};