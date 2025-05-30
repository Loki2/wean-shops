const Product = require("../models/product");
const Service = require("../models/category");
const mkdirp = require("mkdirp");
const Category = require("../models/category");


exports.get_products = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 })

    res.render('admin/product/index', {
      products: products
    })
  } catch (error) {
    next(error)
  }
}

exports.get_createProduct = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 })

    res.render('admin/product/create', {
      categories: categories
    })
  } catch (error) {
    next(error);
  }
}

exports.post_createProduct = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.productImage !== 'undefined' ? req.files.productImage.name : "";
    const { code, name, desc, price, stock_available, status } = req.body;
    const category = req.body.category;

    const product = new Product({
      code: code,
      name: name,
      desc: desc,
      price: price,
      image: imageFile,
      category: category,
      stock: stock_available, // Default stock value 0
      status: status
    });

    await product.save(function (error) {
      if (error) return console.log(error);

      mkdirp.sync('./public/uploads/images/products/' + product._id);

      mkdirp.sync('./public/uploads/images/products/' + product._id + '/gallery');

      if (imageFile != "") {
        const productImage = req.files.productImage;
        const path = './public/uploads/images/products/' + product._id + '/' + imageFile;

        productImage.mv(path, function (error) {
          return console.log(error)
        });
      }
    });

    res.redirect('/admin/products')
  } catch (error) {
    next(error);
  }
}

exports.get_viewProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    const service = await Service.findById({ _id: product.category });

    res.render('admin/product/view', {
      code: product.code,
      name_lao: product.name_lao,
      name_eng: product.name_eng,
      desc: product.desc,
      image: product.image,
      category: service.name_eng,
    })
  } catch (error) {
    next(error);
  }
}

exports.get_updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    const services = await Service.find();

    res.render('admin/product/edit', {
      id: product._id,
      services: services,
      code: product.code,
      name_lao: product.name_lao,
      name_eng: product.name_eng,
      desc: product.desc,
      image: product.image,
      status: product.status
    }); 0
  } catch (error) {
    next(error)
  }
}

exports.post_updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Product.update({ _id: id }, req.body);

    res.redirect('/admin/products')
  } catch (error) {
    next(error)
  }
}

exports.get_deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndRemove(id);

    res.redirect('/admin/products')
  } catch (error) {
    next(error);
  }
}